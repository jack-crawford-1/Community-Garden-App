import { useEffect } from 'react';

export function useMapTextOverlay(map: google.maps.Map | null) {
  useEffect(() => {
    const overlayClosed = sessionStorage.getItem('overlayClosed');
    if (overlayClosed) return;

    const myTitle = document.createElement('div');
    myTitle.style.color = 'white';
    myTitle.style.fontWeight = '400';
    myTitle.style.padding = '15px';
    myTitle.style.backgroundColor = 'rgba(22, 163, 53, 0.7)';
    myTitle.style.borderRadius = '15px';
    myTitle.style.margin = '10px';
    myTitle.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    myTitle.style.width = '400px';
    myTitle.style.height = '350px';
    myTitle.style.position = 'absolute';
    myTitle.style.bottom = '300px';
    myTitle.style.left = '30px';

    myTitle.id = 'overlayContainer';

    myTitle.innerHTML = `
      <style>
        #closeOverlay:hover {
          color: red;
          transform: scale(1.1);
        }
      </style>
      <h1 style="font-weight: 600; text-align: center; font-size: 2em; margin-bottom: 20px; padding-top: 15px; padding-left: 20px; padding-right: 20px;">
        Welcome to Community Gardens
      </h1>
      <p style="font-weight: 400; text-align: center; font-size: 1.2em; line-height: 1.3; padding-left: 20px; padding-right: 20px;">
        Once signed in, click the map to add a new community garden or click on the leaf marker to view details for existing gardens.
      </p>
       <p style="font-weight: 400; color: lightGray; text-align: center; font-size: 1em; line-height: 1.9; padding-top: 20px;">
        Tap anywhere to close this overlay.
      </p>
    `;

    document.body.appendChild(myTitle);

    myTitle.addEventListener('click', closeOverlay);

    function closeOverlay() {
      myTitle.style.display = 'none';
      sessionStorage.setItem('overlayClosed', 'true');
    }

    return () => {
      myTitle.remove();
    };
  }, []);
}
