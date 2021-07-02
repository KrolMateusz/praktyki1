import { useStore } from "vuex";
import axios from "axios";
import { computeDestinationPoint } from "geolib";
import H from "@here/maps-api-for-javascript";
import burger from "@/components/common/icons/burger.svg";
import kebab from "@/components/common/icons/kebab.svg";
import pizza from "@/components/common/icons/pizza.svg";

export const useMap = () => {
  const store = useStore();

  const calculateCords = (start, distanceInM) => {
    const cords = [];
    for (const bearing of [0, 45, 90, 135, 180, 225, 270, 315]) {
      const { latitude, longitude } = computeDestinationPoint(
        start,
        distanceInM,
        bearing
      );
      cords.push({
        lat: latitude,
        lng: longitude,
      });
    }
    return cords;
  };

  const findUserPosition = async (query) => {
    const discoveryUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=${process.env.VUE_APP_API_KEY}`;
    try {
      const payload = await axios.get(discoveryUrl);
      return payload.data.items[0].position;
    } catch (e) {
      console.error(e);
    }
  };

  const findRestaurants = async ({
    lat = 51.117883,
    lng = 17.038538,
    radiusInM = 5000,
    foodType = "pizza",
    limit = 50,
  }) => {
    const distanceInM = store.getters.getDistance;
    const map = store.getters.getMap;
    const foodTypes = {
      pizza: {
        icon: new H.map.Icon(pizza, { size: { w: 20, h: 20 } }),
        id: "800-057",
      },
      burger: {
        icon: new H.map.Icon(burger, { size: { w: 20, h: 20 } }),
        id: "800-067",
      },
      kebab: {
        icon: new H.map.Icon(kebab, { size: { w: 20, h: 20 } }),
        id: "252-000",
      },
    };
    const { icon, id } = foodTypes[foodType];
    const restaurants = [];
    const cords = calculateCords({ lat, lng }, radiusInM + distanceInM);

    map.addObject(new H.map.Marker({ lat, lng }));

    const createBrowseQueryUrls = ({ lat, lng }) =>
      `https://browse.search.hereapi.com/v1/browse?at=${lat},${lng}&foodTypes=${id}&in=circle:${lat},${lng};r=${radiusInM}&limit=${limit}&apiKey=${process.env.VUE_APP_API_KEY}`;
    const browseUrls = cords.map(createBrowseQueryUrls);
    const browseActions = browseUrls.map((url) => axios.get(url));

    const result = await Promise.all(browseActions);
    const places = result.map((item) => item.data.items).flat();
    for (const place of places) {
      restaurants.push({
        name: place.title,
        address: place.address,
        openingHours: place.openingHours ? place.openingHours[0].text : null,
        position: place.position,
      });
    }
    restaurants.forEach((item) => {
      map.addObject(new H.map.Marker(item.position, { icon }));
    });
  };

  const drawRouteToRestaurant = ({
    originLat,
    originLng,
    destinationLat,
    destinationLng,
    transport = "pedestrian",
  }) => {
    const restaurantUrl = `https://router.hereapi.com/v8/routes?transportMode=${transport}&origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}&return=travelSummary,polyline&apiKey=${process.env.VUE_APP_API_KEY}`;
    axios.get(restaurantUrl).then(({ data }) => {
      const map = store.getters.getMap;
      const section = data.routes[0].sections[0];
      const polyline = section.polyline;
      const lineString = H.geo.LineString.fromFlexiblePolyline(polyline);

      const routeOutline = new H.map.Polyline(lineString, {
        style: {
          lineWidth: 10,
          strokeColor: "rgba(0, 128, 255, 0.7)",
          lineTailCap: "arrow-tail",
          lineHeadCap: "arrow-head",
        },
      });
      const routeArrows = new H.map.Polyline(lineString, {
        style: {
          lineWidth: 10,
          fillColor: "white",
          strokeColor: "rgba(255, 255, 255, 1)",
          lineDash: [0, 2],
          lineTailCap: "arrow-tail",
          lineHeadCap: "arrow-head",
        },
      });
      const routeLine = new H.map.Group();
      routeLine.addObjects([routeOutline, routeArrows]);
      const startMarker = new H.map.Marker(section.departure.place.location);
      const endMarker = new H.map.Marker(section.arrival.place.location);
      map.addObjects([routeLine, startMarker, endMarker]);
      map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
    });
  };

  return {
    findRestaurants,
    drawRouteToRestaurant,
    findUserPosition,
  };
};
