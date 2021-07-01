import { useStore } from "vuex";
import axios from "axios";

export const useMap = (initCords = { lat: 51.117883, lng: 17.038538 }) => {
  const originLat = initCords.lat;
  const originLng = initCords.lng;
  const store = useStore();
  console.log(store);
  const calculateCords = (start, distance) => {
    const cords = [];
    for (const lat of [distance / 100, -distance / 100]) {
      cords.push(
        {
          lat: start.lat - lat,
          lng: start.lng,
        },
        {
          lat: start.lat,
          lng: start.lng - lat,
        }
      );
    }
    return cords;
  };

  const findRestaurants = () => {
    const distance = 2;
    const cords = calculateCords({ lat: originLat, lng: originLng }, distance);
    const createBrowseQueryUrls = ({ lat, lng }) =>
      `https://browse.search.hereapi.com/v1/browse?at=${lat},${lng}&foodTypes=800-057&circle:${lat},${lng};r=${
        distance * 1000
      }&limit=5&apiKey=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`;
    const createRouteQueryUrls = (restaurant) =>
      `https://router.hereapi.com/v8/routes?transportMode=pedestrian&origin=${originLat},${originLng}&destination=${restaurant.position.lat},${restaurant.position.lng}&return=travelSummary&apiKey=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`;
    const browseUrls = cords.map(createBrowseQueryUrls);

    const fetchData = (url) => axios.get(url);
    const browseActions = browseUrls.map(fetchData);
    Promise.all(browseActions).then((result) => {
      const restaurants = result.map((item) => item.data.items).flat();
      const routeUrls = restaurants.map(createRouteQueryUrls);
      const routeActions = routeUrls.map(fetchData);
      Promise.all(routeActions).then((response) => {
        console.dir(response);
        const filteredRestaurants = response.filter(
          ({ data }) =>
            data.routes[0].sections[0].travelSummary.length >= distance * 1000
        );
        console.dir(filteredRestaurants);
      });
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
  };
};
