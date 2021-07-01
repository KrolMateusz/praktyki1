import { useStore } from "vuex";
import axios from "axios";
import pizza from "@/components/common/icons/pizza.svg";

export const useMap = (initCords = { lat: 51.117883, lng: 17.038538 }) => {
  const originLat = initCords.lat;
  const originLng = initCords.lng;
  // później z store'a
  const distanceInKm = 1;
  const H = window.H;
  const store = useStore();

  const calculateCords = (start, radiusInKm) => {
    const cords = [];
    const distances = [
      -(distanceInKm + radiusInKm) / 100,
      0,
      (distanceInKm + radiusInKm) / 100,
    ];
    for (const x of distances) {
      for (const y of distances) {
        if (x === 0 && y === 0) continue;
        cords.push({
          lat: start.lat + x,
          lng: start.lng + y,
        });
      }
    }
    return cords;
  };

  const findUserPosition = async (query) => {
    const discoveryUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`;
    try {
      const payload = await axios.get(discoveryUrl);
      return payload.data.items[0].position;
    } catch (e) {
      console.log(e);
    }
  };

  const findRestaurants = async ({
    lat = 51.117883,
    lng = 17.038538,
    radiusInKm = 0.5,
  }) => {
    const map = store.getters.getMap;
    const pizzaIcon = new H.map.Icon(pizza, { size: { w: 20, h: 20 } });
    const restaurants = [];
    const cords = calculateCords({ lat, lng }, radiusInKm);
    console.log(cords);

    map.addObject(new H.map.Marker({ lat, lng }));

    const createBrowseQueryUrls = ({ lat, lng }) =>
      `https://browse.search.hereapi.com/v1/browse?at=${lat},${lng}&foodTypes=800-057&in=circle:${lat},${lng};r=${
        radiusInKm * 1000
      }&limit=20&apiKey=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`;
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
      map.addObject(new H.map.Marker(item.position, { icon: pizzaIcon }));
    });
  };

  const drawRouteToRestaurant = (restaurantPosition) => {
    const restaurantUrl = `https://router.hereapi.com/v8/routes?transportMode=pedestrian&origin=${originLat},${originLng}&destination=${restaurantPosition.lat},${restaurantPosition.lng}&return=travelSummary,polyline&apiKey=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`;
    const H = window.H;
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
