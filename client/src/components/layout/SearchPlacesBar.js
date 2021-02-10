import React from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

const SearchPlacesBar = ({ panTo }) => {
  const {
    ready, value, suggestions: {status, data}, setValue, clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {lat: () => 42.3736, lng: () => -71.1097},
      radius: 100 * 1000
    }
  })

  return (
    <div className="search">
      <Combobox 
        onSelect={async (address) => {
          setValue(address, false)
          clearSuggestions()

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0])
            panTo({ lat, lng })
            console.log(lat, lng)
            console.log(results[0])
          } catch(error) {
            console.log("error!")
          }
        }}
      >
        <ComboboxInput 
          value={value} 
          onChange={e => {
            setValue(e.target.value)
          }}
          disabled={!ready}
          placeholder= "Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && data.map((singleData) => (
              <ComboboxOption 
                key={singleData.id} 
                value={singleData.description} 
              />
            ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default SearchPlacesBar