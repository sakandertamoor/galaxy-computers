$('#country').on('change select', function () {

    updateDropdowns();

});

$(document).ready(function () {
    updateDropdowns();
});

function updateDropdowns() {

    let countryValue = $('#country').val();


    let usStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'IllinoisIndiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
        'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'MontanaNebraska',
        'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
        'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    let usCities = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];

    let canadaProvinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon Territory'];

    let canadaCities = ["Airdrie", "Grande Prairie", "Red Deer", "Beaumont", "Hanna", "St. Albert", "Bonnyville", "Hinton", "Spruce Grove", "Brazeau", "Irricana", "Strathcona County", "Breton", "Lacombe", "Strathmore", "Calgary", "Leduc", "Sylvan Lake", "Camrose", "Lethbridge", "Swan Hills", "Canmore", "McLennan", "Taber", "Didzbury", "Medicine Hat", "Turner Valley", "Drayton Valley", "Olds", "Vermillion", "Edmonton", "Onoway", "Wood Buffalo", "Ft. Saskatchewan", "Provost", "Burnaby", "Lumby", "City of Port Moody", "Cache Creek", "Maple Ridge", "Prince George", "Castlegar", "Merritt", "Prince Rupert", "Chemainus", "Mission", "Richmond", "Chilliwack", "Nanaimo", "Saanich", "Clearwater", "Nelson", "Sooke", "Colwood", "New Westminster", "Sparwood", "Coquitlam", "North Cowichan", "Surrey", "Cranbrook", "North Vancouver", "Terrace", "Dawson Creek", "North Vancouver", "Tumbler", "Delta", "Osoyoos", "Vancouver", "Fernie", "Parksville", "Vancouver", "Invermere", "Peace River", "Vernon", "Kamloops", "Penticton", "Victoria", "Kaslo", "Port Alberni", "Whistler", "Langley", "Port Hardy", "Birtle", "Flin Flon", "Swan River", "Brandon", "Snow Lake", "The Pas", "Cranberry Portage", "Steinbach", "Thompson", "Dauphin", "Stonewall", "Winnipeg", "Cap-Pele", "Miramichi", "Saint John", "Fredericton", "Moncton", "Saint Stephen", "Grand Bay-Westfield", "Oromocto", "Shippagan", "Grand Falls", "Port Elgin", "Sussex", "Memramcook", "Sackville", "Tracadie-Sheila", "Argentia", "Corner Brook", "Paradise", "Bishop's Falls", "Labrador City", "Portaux Basques", "Botwood", "Mount Pearl", "St. John's", "Brigus", "Town of Hay River", "Town of Inuvik", "Yellowknife", "Amherst", "Hants County", "Pictou", "Annapolis", "Inverness County", "Pictou County", "Argyle", "Kentville", "Queens", "Baddeck", "County of Kings", "Richmond", "Bridgewater", "Lunenburg", "Shelburne", "Cape Breton", "Lunenburg County", "Stellarton", "Chester", "Mahone Bay", "Truro", "Cumberland County", "New Glasgow", "Windsor", "East Hants", "New Minas", "Yarmouth", "Halifax", "Parrsboro", "Ajax", "Halton", "Peterborough", "Atikokan", "Halton Hills", "Pickering", "Barrie", "Hamilton", "Port Bruce", "Belleville", "Hamilton-Wentworth", "Port Burwell", "Blandford-Blenheim", "Hearst", "Port Colborne", "Blind River", "Huntsville", "Port Hope", "Brampton", "Ingersoll", "Prince Edward", "Brant", "James", "Quinte West", "Brantford", "Kanata", "Renfrew", "Brock", "Kincardine", "Richmond Hill", "Brockville", "King", "Sarnia", "Burlington", "Kingston", "Sault Ste. Marie", "Caledon", "Kirkland Lake", "Scarborough", "Cambridge", "Kitchener", "Scugog", "Chatham-Kent", "Larder Lake", "Souix Lookout CoC Sioux Lookout", "Chesterville", "Leamington", "Smiths Falls", "Clarington", "Lennox-Addington", "South-West Oxford", "Cobourg", "Lincoln", "St. Catharines", "Cochrane", "Lindsay", "St. Thomas", "Collingwood", "London", "Stoney Creek", "Cornwall", "Loyalist Township", "Stratford", "Cumberland", "Markham", "Sudbury", "Deep River", "Metro Toronto", "Temagami", "Dundas", "Merrickville", "Thorold", "Durham", "Milton", "Thunder Bay", "Dymond", "Nepean", "Tillsonburg", "Ear Falls", "Newmarket", "Timmins", "East Gwillimbury", "Niagara", "Toronto", "East Zorra-Tavistock", "Niagara Falls", "Uxbridge", "Elgin", "Niagara-on-the-Lake", "Vaughan", "Elliot Lake", "North Bay", "Wainfleet", "Flamborough", "North Dorchester", "Wasaga Beach", "Fort Erie", "North Dumfries", "Waterloo", "Fort Frances", "North York", "Waterloo", "Gananoque", "Norwich", "Welland", "Georgina", "Oakville", "Wellesley", "Glanbrook", "Orangeville", "West Carleton", "Gloucester", "Orillia", "West Lincoln", "Goulbourn", "Osgoode", "Whitby", "Gravenhurst", "Oshawa", "Wilmot", "Grimsby", "Ottawa", "Windsor", "Guelph", "Ottawa-Carleton", "Woolwich", "Haldimand-Norfork", "Owen Sound", "York", "Alberton", "Montague", "Stratford", "Charlottetown", "Souris", "Summerside", "Cornwall", "Alma", "Fleurimont", "Longueuil", "Amos", "Gaspe", "Marieville", "Anjou", "Gatineau", "Mount Royal", "Aylmer", "Hull", "Montreal", "Beauport", "Joliette", "Montreal Region", "Bromptonville", "Jonquiere", "Montreal-Est", "Brosssard", "Lachine", "Quebec", "Chateauguay", "Lasalle", "Saint-Leonard", "Chicoutimi", "Laurentides", "Sherbrooke", "Coaticook", "LaSalle", "Sorel", "Coaticook", "Laval", "Thetford Mines", "Dorval", "Lennoxville", "Victoriaville", "Drummondville", "Levis", "Avonlea", "Melfort", "Swift Current", "Colonsay", "Nipawin", "Tisdale", "Craik", "Prince Albert", "Unity", "Creighton", "Regina", "Weyburn", "Eastend", "Saskatoon", "Wynyard", "Esterhazy", "Shell Lake", "Yorkton", "Gravelbourg", "Carcross", "Whitehorse"];

    let state = $('#state');
    let city = $('#city');

    let currentState = state.val();
    let currentCity = city.val();

    if (countryValue == 'us' || countryValue == 'US') {

        $('#country').html('');
        $('#country').append('<option value="us" selected>United States</option>');
        $('#country').append('<option value="canada">Canada</option>');

        state.html('');
        // state.append('<option value="' + currentState + '">' + currentState + '</option>');
        if(selectedCountry == countryValue){
            usStates.push(customeState);
            usCities.push(customeCity);
       }
        for (let i = 0; i < usStates.length; i++) {
            if (currentState == usStates[i])
                state.append('<option selected value="' + usStates[i] + '">' + usStates[i] + '</option>');
            else
                state.append('<option value="' + usStates[i] + '">' + usStates[i] + '</option>');
        }

        city.html('');
        // city.append('<option value="' + currentCity + '">' + currentCity + '</option>');
        for (let i = 0; i < usCities.length; i++) {
            if (currentCity == usCities[i])
                city.append('<option selected value="' + usCities[i] + '">' + usCities[i] + '</option>');
            else
                city.append('<option value="' + usCities[i] + '">' + usCities[i] + '</option>');
        }

    } else if (countryValue == 'canada' || countryValue == 'Canada') {

        $('#country').html('');
        $('#country').append('<option value="us">United States</option>');
        $('#country').append('<option value="canada" selected>Canada</option>');


        state.html('');
        // state.append('<option value="' + currentState + '">' + currentState + '</option>');s
        if(selectedCountry == countryValue){
            canadaProvinces.push(customeState);
            canadaCities.push(customeCity);
       }
        for (let i = 0; i < canadaProvinces.length; i++) {
            if (currentState == canadaProvinces[i])
                state.append('<option selected value="' + canadaProvinces[i] + '">' + canadaProvinces[i] + '</option>');
            else
                state.append('<option value="' + canadaProvinces[i] + '">' + canadaProvinces[i] + '</option>');
        }
        city.html('');
        // city.append('<option value="' + currentCity + '">' + currentCity + '</option>');
        for (let i = 0; i < canadaCities.length; i++) {
            if (currentCity == canadaCities[i])
                city.append('<option selected value="' + canadaCities[i] + '">' + canadaCities[i] + '</option>');
            else
                city.append('<option value="' + canadaCities[i] + '">' + canadaCities[i] + '</option>');
        }
    }
}
