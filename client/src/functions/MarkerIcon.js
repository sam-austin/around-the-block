const MarkerIcon = (color, fillOpacity) => {
  return ({
    path:
      "M10.453 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: color,
    fillOpacity: fillOpacity,
    strokeWeight: 0,
    rotation: 0,
    scale: 1.5,
    anchor: new google.maps.Point(13.2, 22),
  })
};

export default MarkerIcon