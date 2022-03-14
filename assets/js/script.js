// --------------------------------- \\
// -------- Javascript Page -------- \\
// --------------------------------- \\


const searchBtn = document.querySelector('.search-btn');
const resultContentEl = document.querySelector('#result-content');


//----Dropdown Picker Menu----//
var usStates = [
    { name: 'ALABAMA', abbreviation: 'AL' },
    { name: 'ALASKA', abbreviation: 'AK' },
    // { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
    { name: 'ARIZONA', abbreviation: 'AZ' },
    { name: 'ARKANSAS', abbreviation: 'AR' },
    { name: 'CALIFORNIA', abbreviation: 'CA' },
    { name: 'COLORADO', abbreviation: 'CO' },
    { name: 'CONNECTICUT', abbreviation: 'CT' },
    { name: 'DELAWARE', abbreviation: 'DE' },
    { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC' },
    // { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
    { name: 'FLORIDA', abbreviation: 'FL' },
    { name: 'GEORGIA', abbreviation: 'GA' },
    // { name: 'GUAM', abbreviation: 'GU'},
    { name: 'HAWAII', abbreviation: 'HI' },
    { name: 'IDAHO', abbreviation: 'ID' },
    { name: 'ILLINOIS', abbreviation: 'IL' },
    { name: 'INDIANA', abbreviation: 'IN' },
    { name: 'IOWA', abbreviation: 'IA' },
    { name: 'KANSAS', abbreviation: 'KS' },
    { name: 'KENTUCKY', abbreviation: 'KY' },
    { name: 'LOUISIANA', abbreviation: 'LA' },
    { name: 'MAINE', abbreviation: 'ME' },
    // { name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
    { name: 'MARYLAND', abbreviation: 'MD' },
    { name: 'MASSACHUSETTS', abbreviation: 'MA' },
    { name: 'MICHIGAN', abbreviation: 'MI' },
    { name: 'MINNESOTA', abbreviation: 'MN' },
    { name: 'MISSISSIPPI', abbreviation: 'MS' },
    { name: 'MISSOURI', abbreviation: 'MO' },
    { name: 'MONTANA', abbreviation: 'MT' },
    { name: 'NEBRASKA', abbreviation: 'NE' },
    { name: 'NEVADA', abbreviation: 'NV' },
    { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
    { name: 'NEW JERSEY', abbreviation: 'NJ' },
    { name: 'NEW MEXICO', abbreviation: 'NM' },
    { name: 'NEW YORK', abbreviation: 'NY' },
    { name: 'NORTH CAROLINA', abbreviation: 'NC' },
    { name: 'NORTH DAKOTA', abbreviation: 'ND' },
    // { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
    { name: 'OHIO', abbreviation: 'OH' },
    { name: 'OKLAHOMA', abbreviation: 'OK' },
    { name: 'OREGON', abbreviation: 'OR' },
    // { name: 'PALAU', abbreviation: 'PW'},
    { name: 'PENNSYLVANIA', abbreviation: 'PA' },
    // { name: 'PUERTO RICO', abbreviation: 'PR'},
    { name: 'RHODE ISLAND', abbreviation: 'RI' },
    { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
    { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
    { name: 'TENNESSEE', abbreviation: 'TN' },
    { name: 'TEXAS', abbreviation: 'TX' },
    { name: 'UTAH', abbreviation: 'UT' },
    { name: 'VERMONT', abbreviation: 'VT' },
    // { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
    { name: 'VIRGINIA', abbreviation: 'VA' },
    { name: 'WASHINGTON', abbreviation: 'WA' },
    { name: 'WEST VIRGINIA', abbreviation: 'WV' },
    { name: 'WISCONSIN', abbreviation: 'WI' },
    { name: 'WYOMING', abbreviation: 'WY' }
];
//----for loop so it can display all the options for that state----//
for (var i = 0; i < usStates.length; i++) {
    var option = document.createElement("option");
    option.text = usStates[i].name + ' [' + usStates[i].abbreviation + ']';
    option.value = usStates[i].abbreviation;
    var select = document.getElementById("state");
    select.appendChild(option);
}
//----End of Dropdown Picker Menu----//

//----search button----//
searchBtn.addEventListener('click', statePark);

function statePark(e) {
    e.preventDefault();

    var searchInputVal = document.querySelector('#state').value;
    console.log(searchInputVal)
    if (!searchInputVal) {
        console.error('You need to search for a city!')
        return;
    }
    searchApi(searchInputVal);
}
//----End of search button----//

//-----Displaying "NPS" API lists with all parks in State's location----//
function searchApi(stateVal) {
    var apiUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${stateVal}&api_key=EVbj21l5TvXpId2wduNH8JdzY1kYN849zHPznIgn`

    fetch(apiUrl).then(res => res.json())
        .then(res => {
            // console.log(renderResults);
            console.log(res.data)
            //---for loop to display---//
            for (let i = 0; i < res.data.length; i++) {
                // console.log(res.data[i])
                renderResults(res.data[i])
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}
//-----End of "NPS" API-----//

//----Start of function to list details for parks---//
function renderResults(parkList) {

    // console.log(parkList);
    // console.log(parkList[5].description);
    // console.log(parkList[5].states);                                                                
    // console.log(parkList[5].contacts);

//----created var to make object into elements---///
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
//----Name of park----//
    var titleEl = document.createElement('h2');
    titleEl.textContent = parkList.fullName;
//----Phone number of park----//
    var parkNumber = document.createElement('p');
    parkNumber.innerHTML +=
        '<strong>Park Number: </strong> ' + parkList.contacts.phoneNumbers[0].phoneNumber + '<br/>';
//----Cost of entry fee to park----//
    var parkCost = document.createElement('p');
    parkCost.innerHTML +=
        '<strong>Park Cost: </strong>' + parkList.entranceFees[0].cost + '<br/>'
//----Breif park description----//
    if (parkList.description) {
        bodyContentEl.innerHTML +=
            '<strong>Description:</strong> ' + parkList.description;
    } else {
        bodyContentEl.innerHTML +=
            '<strong>Description:</strong>  No description for this entry.';
    }

    var linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Read More';
    linkButtonEl.setAttribute('href', parkList.url);
    linkButtonEl.setAttribute('target', '_blank');
    linkButtonEl.classList.add('btn', 'btn-dark');
//----appending all the attributes to page tab----//
    resultBody.append(titleEl, parkNumber, parkCost, bodyContentEl, linkButtonEl);
//---appending result card----//
    resultContentEl.append(resultCard);


}










