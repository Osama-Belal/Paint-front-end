'use script';
class Gn8Colorize {
    constructor ( data ) {
        this.toolbox;
        this.promise;
        this.rgb;
        this.hex;
        this.name;
        this.theme = "light";
        this.promiseResolve;
        this.promiseReject;
        this.timer;
        if ( typeof data != "object" ) {
            try {
                this.data = JSON.parse( data );
            } catch (error) {
                console.log( "not valid data - gn8Colorize" );
            }
        }else{
            this.data = data;
        }
        try {
            this.id = this.data.id || this.idFunction();
            this.container = this.data.container;
            this.value = this.data.value || window.getComputedStyle(document.documentElement).getPropertyValue( '--app-primary-color' ) || "rgba(255,0,0,1)";
            this.value = this.value.replace(/\s/g,'');
            if ( this.value.indexOf( "#" ) > -1 ) {
                this.hex = this.value;
                this.rgb = this.hexToRgb( this.hex );
            }else{
                this.rgb = this.value;
                this.hex = this.rgbToHEX( this.rgb );
                var result = /(\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3})\S/g.exec( this.rgb );
                if ( !result ) {
                    result = /(\d{1,3}),(\d{1,3}),(\d{1,3})\S/g.exec( this.rgb );
                    this.rgb = `rgba(${result[1]},${result[2]},${result[3]},1)`;
                }
            }
            this.theme = this.inspectTheme();
            this.name = this.inspectName();
        } catch (error) {
            console.log( "can not create - gn8Colorize" );
        }
        this._names = {
            "#000000":"Black",
            "#000080":"Navy",
            "#00008b":"Dark Blue",
            "#00009c":"Duke Blue",
            "#0000cd":"Medium Blue",
            "#0000ff":"Blue",
            "#000741":"Stratos",
            "#000f89":"Phthalo Blue",
            "#0014a8":"Zaffre",
            "#0018a8":"Pantone Blue",
            "#001b1c":"Swamp",
            "#002147":"Oxford Blue",
            "#002387":"Resolution Blue",
            "#002395":"Imperial Blue",
            "#002900":"Deep Fir",
            "#002e20":"Burnham",
            "#002e63":"Cool Black",
            "#002fa7":"International Klein Blue",
            "#00308f":"Air Force Blue",
            "#003153":"Prussian Blue",
            "#003366":"Dark Midnight Blue",
            "#003399":"Smalt",
            "#0033aa":"UA Blue",
            "#003532":"Deep Teal",
            "#0038a8":"Royal Azure",
            "#003e40":"Cyprus",
            "#004040":"Rich Black",
            "#004225":"British Racing Green",
            "#004242":"Warm Black",
            "#004620":"Kaitoke Green",
            "#0047ab":"Cobalt Blue",
            "#004816":"Crusoe",
            "#0048ba":"Absolute Zero",
            "#004950":"Sherpa Blue",
            "#004953":"Eagle Green",
            "#004b49":"Deep Jungle Green",
            "#004f98":"USAFA Blue",
            "#00563b":"Castleton Green",
            "#0056a7":"Endeavour",
            "#00581a":"Camarone",
            "#006400":"X11 Dark Green",
            "#006600":"Pakistan Green",
            "#0066cc":"Science Blue",
            "#0066ff":"Blue Ribbon",
            "#0067a5":"Sapphire Blue",
            "#006994":"Sea Blue",
            "#006a4e":"Bottle Green",
            "#006b3c":"Cadmium Green",
            "#006db0":"Honolulu Blue",
            "#00703c":"Dartmouth Green",
            "#0070b8":"Spanish Blue",
            "#0070ff":"Brandeis Blue",
            "#0072bb":"French Blue",
            "#0073cf":"True Blue",
            "#007474":"Skobeloff",
            "#00755e":"Tropical Rain Forest",
            "#0076a3":"Allports",
            "#0077be":"Ocean Boat Blue",
            "#007aa5":"CG Blue",
            "#007ba7":"Cerulean",
            "#007bb8":"Star Command Blue",
            "#007ec7":"Lochmara",
            "#007f5c":"Spanish Viridian",
            "#007f66":"Generic Viridian",
            "#007fff":"Azure",
            "#008000":"Ao",
            "#008080":"Teal",
            "#00827f":"Teal Green",
            "#0087bd":"NCS Blue",
            "#008b8b":"Dark Cyan",
            "#009000":"Islamic Green",
            "#009150":"Spanish Green",
            "#0093af":"Munsell Blue",
            "#0095b6":"Bondi Blue",
            "#009698":"Viridian Green",
            "#009966":"Green Cyan",
            "#009b7d":"Paolo Veronese Green",
            "#009e60":"Shamrock Green",
            "#009f6b":"NCS Green",
            "#00a550":"Pigment Green",
            "#00a693":"Persian Green",
            "#00a86b":"Jade",
            "#00a877":"Munsell Green",
            "#00aae4":"Spanish Sky Blue",
            "#00aaee":"Vivid Cerulean",
            "#00ab66":"GO Green",
            "#00ad43":"Pantone Green",
            "#00b7eb":"Process Cyan",
            "#00bfff":"Capri",
            "#00cc33":"Vivid Malachite",
            "#00cc99":"Caribbean Green",
            "#00cccc":"Robin Egg Blue",
            "#00ccff":"Vivid Sky Blue",
            "#00ced1":"Dark Turquoise",
            "#00fa9a":"Medium Spring Green",
            "#00ff00":"Green",
            "#00ff7f":"Spring Green",
            "#00ffef":"Turquoise Blue",
            "#00ffff":"Cyan",
            "#010203":"FOGRA39 Rich Black",
            "#010b13":"FOGRA29 Rich Black",
            "#010d1a":"Blue Charcoal",
            "#011d13":"Holly",
            "#012731":"Daintree",
            "#013220":"Dark Green",
            "#01361c":"Cardin Green",
            "#01371a":"County Green",
            "#013e62":"Astronaut Blue",
            "#013f6a":"Regal Blue",
            "#014421":"UP Forest Green",
            "#014b43":"Aqua Deep",
            "#015e85":"Orient",
            "#016162":"Blue Stone",
            "#016d39":"Fun Green",
            "#01796f":"Pine Green",
            "#01826b":"Deep Sea",
            "#01a368":"Green Haze",
            "#022d15":"English Holly",
            "#02402c":"Sherwood Green",
            "#02478e":"Congress Blue",
            "#0247fe":"RYB Blue",
            "#024e46":"Evening Sea",
            "#026395":"Bahama Blue",
            "#02866f":"Observatory",
            "#03163c":"Tangaroa",
            "#032b52":"Green Vogue",
            "#035096":"Medium Electric Blue",
            "#036a6e":"Mosque",
            "#03c03c":"Dark Pastel Green",
            "#041004":"Midnight Moss",
            "#041322":"Black Pearl",
            "#042e4c":"Blue Whale",
            "#043927":"Sacramento State Green",
            "#044022":"Zuccini",
            "#051040":"Deep Cove",
            "#051657":"Gulf Blue",
            "#055989":"Venice Blue",
            "#056608":"Deep Green",
            "#056f57":"Watercourse",
            "#059033":"North Texas Green",
            "#062a78":"Catalina Blue",
            "#063537":"Tiber",
            "#069b81":"Gossamer",
            "#06a189":"Niagara",
            "#073a50":"Tarawera",
            "#080110":"Jaguar",
            "#082567":"Deep Sapphire",
            "#08457e":"Dark Cerulean",
            "#087830":"La Salle Green",
            "#088370":"Elf Green",
            "#0892d0":"Rich Electric Blue",
            "#08e8de":"Bright Turquoise",
            "#091f92":"Indigo Dye",
            "#092256":"Downriver",
            "#09230f":"Palm Green",
            "#09255d":"Madison",
            "#095859":"Deep Sea Green",
            "#097f4b":"Salem",
            "#0a001c":"Black Russian",
            "#0a480d":"Dark Fern",
            "#0a6906":"Japanese Laurel",
            "#0a6f75":"Atoll",
            "#0a7e8c":"Metallic Seaweed",
            "#0abab5":"Tiffany Blue",
            "#0b0b0b":"Cod Gray",
            "#0b0f08":"Marshland",
            "#0b1107":"Gordons Green",
            "#0b1304":"Black Forest",
            "#0b6207":"San Felix",
            "#0bda51":"Malachite",
            "#0c0d0f":"Woodsmoke",
            "#0c1911":"Racing Green",
            "#0c7a79":"Surfie Green",
            "#0c8990":"Blue Chill",
            "#0d0332":"Black Rock",
            "#0d1117":"Bunker",
            "#0d1c19":"Aztec",
            "#0d2e1c":"Bush",
            "#0d98ba":"Blue Green",
            "#0e0e18":"Cinder",
            "#0e2a30":"Firefly",
            "#0e7c61":"Deep Green Cyan Turquoise",
            "#0f2d9e":"Torea Bay",
            "#0f4d92":"Yale Blue",
            "#0f52ba":"Sapphire",
            "#0fc0fc":"Spiro Disco Ball",
            "#100c08":"Smoky Black",
            "#10121d":"Vulcan",
            "#101405":"Green Waterloo",
            "#1034a6":"Egyptian Blue",
            "#105852":"Eden",
            "#110c6c":"Arapawa",
            "#1164b4":"Green Blue",
            "#123447":"Elephant",
            "#123524":"Phthalo Green",
            "#126180":"Blue Sapphire",
            "#126b40":"Jewel",
            "#130000":"Diesel",
            "#130a06":"Asphalt",
            "#13264d":"Blue Zodiac",
            "#134f19":"Parsley",
            "#138808":"India Green",
            "#140600":"Nero",
            "#1450aa":"Tory Blue",
            "#151f4c":"Bunting",
            "#1560bd":"Denim",
            "#15736b":"Genoa",
            "#161928":"Mirage",
            "#162a40":"Big Stone",
            "#163222":"Celtic",
            "#16322c":"Timber Green",
            "#163531":"Gable Green",
            "#171f04":"Pine Tree",
            "#175579":"Chathams Blue",
            "#177245":"Dark Spring Green",
            "#182d09":"Deep Forest Green",
            "#18453b":"MSU Green",
            "#18587a":"Blumine",
            "#188bc2":"Cyan Cornflower Blue",
            "#191970":"Midnight Blue",
            "#19330e":"Palm Leaf",
            "#193751":"Nile Blue",
            "#195905":"Lincoln Green",
            "#1959a8":"Fun Blue",
            "#1974d2":"Bright Navy Blue",
            "#1a1110":"Licorice",
            "#1a1a68":"Lucky Point",
            "#1a2421":"Dark Jungle Green",
            "#1b0245":"Tolopea",
            "#1b1035":"Haiti",
            "#1b1404":"Acadia",
            "#1b1b1b":"Eerie Black",
            "#1b2f11":"Seaweed",
            "#1b3162":"Biscay",
            "#1b4d3e":"Brunswick Green",
            "#1b659d":"Matisse",
            "#1c1208":"Crowshead",
            "#1c1cf0":"Bluebonnet",
            "#1c1e13":"Rangoon Green",
            "#1c2841":"Yankees Blue",
            "#1c352d":"Medium Jungle Green",
            "#1c39bb":"Persian Blue",
            "#1c402e":"Everglade",
            "#1c7c7d":"Elm",
            "#1ca9c9":"Pacific Blue",
            "#1cac78":"Crayola Green",
            "#1d2951":"Space Cadet",
            "#1d6142":"Green Pea",
            "#1dacd6":"Bright Cerulean",
            "#1e0f04":"Creole",
            "#1e1609":"Karaka",
            "#1e1708":"El Paso",
            "#1e385b":"Cello",
            "#1e433c":"Te Papa Green",
            "#1e4d2b":"Cal Poly Green",
            "#1e90ff":"Dodger Blue",
            "#1e9ab0":"Eastern Blue",
            "#1f120f":"Night Rider",
            "#1f262a":"Dark Gunmetal",
            "#1f75fe":"Crayola Blue",
            "#1fc2c2":"Java",
            "#20208d":"Jacksons Purple",
            "#202e54":"Cloud Burst",
            "#204852":"Blue Dianne",
            "#20b2aa":"Light Sea Green",
            "#211a0e":"Eternity",
            "#214fc6":"New Car",
            "#21abcd":"Ball Blue",
            "#220878":"Deep Blue",
            "#2243b6":"Denim Blue",
            "#228b22":"Forest Green",
            "#23297a":"St Patricks Blue",
            "#232b2b":"Charleston Green",
            "#233418":"Mallard",
            "#240c02":"Kilamanjaro",
            "#242124":"Raisin Black",
            "#242a1d":"Log Cabin",
            "#24500f":"Green House",
            "#251607":"Graphite",
            "#251706":"Cannon Black",
            "#251f4f":"Port Gore",
            "#25272c":"Shark",
            "#25311c":"Green Kelp",
            "#253529":"Black Leather Jacket",
            "#2596d1":"Curious Blue",
            "#260368":"Paua",
            "#26056a":"Paris M",
            "#261105":"Wood Bark",
            "#261414":"Gondola",
            "#262335":"Steel Gray",
            "#26283b":"Ebony Clay",
            "#264348":"Japanese Indigo",
            "#26619c":"Lapis Lazuli",
            "#273a81":"Bay of Many",
            "#273be2":"Palatinate Blue",
            "#27504b":"Plantation",
            "#281e15":"Oil",
            "#283a77":"Astronaut",
            "#28589c":"Cyan Cobalt Blue",
            "#286acd":"Mariner",
            "#290c5e":"Violent Violet",
            "#292130":"Bastille",
            "#292319":"Zeus",
            "#292937":"Charade",
            "#299617":"Slimy Green",
            "#29ab87":"Jungle Green",
            "#2a0359":"Cherry Pie",
            "#2a140e":"Coffee Bean",
            "#2a2630":"Baltic Sea",
            "#2a3439":"Gunmetal",
            "#2a380b":"Turtle Green",
            "#2a52be":"Cerulean Blue",
            "#2a8000":"Napier Green",
            "#2b0202":"Sepia Black",
            "#2b194f":"Valhalla",
            "#2b3228":"Heavy Metal",
            "#2c0e8c":"Blue Gem",
            "#2c1608":"Zinnwaldite Brown",
            "#2c1632":"Revolver",
            "#2c2133":"Bleached Cedar",
            "#2c8c84":"Lochinvar",
            "#2d2510":"Mikado",
            "#2d569b":"St Tropaz",
            "#2e0329":"Jacaranda",
            "#2e1905":"Jacko Bean",
            "#2e2d88":"Cosmic Cobalt",
            "#2e3222":"Rangitoto",
            "#2e3f62":"Rhino",
            "#2e5894":"Bdazzled Blue",
            "#2e8b57":"Sea Green",
            "#2ebfd4":"Scooter",
            "#2f270e":"Onion",
            "#2f3cb3":"Governor Bay",
            "#2f4f4f":"Dark Slate Gray",
            "#2f5a57":"Spectra",
            "#2f6168":"Casal",
            "#2f847c":"Celadon Green",
            "#300529":"Melanzane",
            "#301934":"Dark Purple",
            "#302a0f":"Woodrush",
            "#304b6a":"San Juan",
            "#306030":"Mughal Green",
            "#30ba8f":"Mountain Meadow",
            "#311c17":"Eclipse",
            "#314459":"Pickled Bluewood",
            "#31728d":"Calypso",
            "#317873":"Myrtle Green",
            "#317d82":"Paradiso",
            "#318ce7":"Bleu De France",
            "#319177":"Illuminating Emerald",
            "#32127a":"Persian Indigo",
            "#32174d":"Russian Violet",
            "#32293a":"Blackcurrant",
            "#323232":"Mine Shaft",
            "#324ab2":"Violet Blue",
            "#325d52":"Stromboli",
            "#327c14":"Bilbao",
            "#327da0":"Astral",
            "#32c6a6":"Pearl Mystic Turquoise",
            "#32cd32":"Lime Green",
            "#330066":"Deep Violet",
            "#33036b":"Christalle",
            "#33292f":"Thunder",
            "#333366":"Deep Koamaru",
            "#333399":"Pigment Blue",
            "#3399ff":"Brilliant Azure",
            "#33cc99":"Shamrock",
            "#341515":"Tamarind",
            "#343434":"Jet",
            "#350e42":"Valentino",
            "#350e57":"Jagger",
            "#353542":"Tuna",
            "#353839":"Onyx",
            "#354230":"Kombu Green",
            "#354e8c":"Chambray",
            "#355e3b":"Hunter Green",
            "#363050":"Martinique",
            "#363534":"Tuatara",
            "#363c0d":"Waiouru",
            "#36454f":"Charcoal",
            "#36747d":"Ming",
            "#367588":"Teal Blue",
            "#368716":"La Palma",
            "#371d09":"Clinker",
            "#37290e":"Brown Tumbleweed",
            "#373021":"Birch",
            "#377475":"Oracle",
            "#380474":"Blue Diamond",
            "#383533":"Dune",
            "#384910":"Clover",
            "#391285":"Pixie Powder",
            "#394851":"Limed Spruce",
            "#396413":"Dell",
            "#39a78e":"Zomp",
            "#39ff14":"Neon Green",
            "#3a0020":"Toledo",
            "#3a2010":"Sambuca",
            "#3a2a6a":"Jacarta",
            "#3a686c":"William",
            "#3a6a47":"Killarney",
            "#3ab09e":"Keppel",
            "#3b000b":"Temptress",
            "#3b0910":"Aubergine",
            "#3b1f1f":"Jon",
            "#3b2820":"Treehouse",
            "#3b331c":"Pullman Green",
            "#3b3c36":"Black Olive",
            "#3b444b":"Arsenic",
            "#3b7a57":"Amazon",
            "#3b91b4":"Boston Blue",
            "#3c0878":"Windsor",
            "#3c1206":"Rebel",
            "#3c1414":"Dark Sienna",
            "#3c1f76":"Meteorite",
            "#3c2005":"Dark Ebony",
            "#3c341f":"Olive Drab Seven",
            "#3c3910":"Camouflage",
            "#3c4151":"Bright Gray",
            "#3c4443":"Cape Cod",
            "#3c493a":"Lunar Green",
            "#3cb371":"Medium Sea Green",
            "#3cd070":"UFO Green",
            "#3d0c02":"Black Bean",
            "#3d2b1f":"Bistre",
            "#3d7d52":"Goblin",
            "#3e0480":"Kingfisher Daisy",
            "#3e1c14":"Cedar",
            "#3e2b23":"English Walnut",
            "#3e2c1c":"Black Marlin",
            "#3e3a44":"Ship Gray",
            "#3eabbf":"Pelorous",
            "#3eb489":"Mint",
            "#3f00ff":"Ultramarine",
            "#3f2500":"Cola",
            "#3f3002":"Madras",
            "#3f307f":"Minsk",
            "#3f4c3a":"Cabbage Pont",
            "#3f583b":"Tom Thumb",
            "#3f5d53":"Mineral Green",
            "#3fc1aa":"Puerto Rico",
            "#3fff00":"Harlequin",
            "#401801":"Brown Pod",
            "#40291d":"Cork",
            "#403b38":"Masala",
            "#403d19":"Thatch Green",
            "#405169":"Fiord",
            "#40826d":"Viridian",
            "#40a860":"Chateau Green",
            "#40e0d0":"Turquoise",
            "#410056":"Ripe Plum",
            "#411f10":"Paco",
            "#412010":"Deep Oak",
            "#413c37":"Merlin",
            "#414257":"Gun Powder",
            "#414a4c":"Outer Space",
            "#414c7d":"East Bay",
            "#4166f5":"Ultramarine Blue",
            "#4169e1":"Royal Blue",
            "#417dc1":"Tufts Blue",
            "#420303":"Burnt Maroon",
            "#423921":"Lisbon Brown",
            "#427977":"Faded Jade",
            "#431560":"Scarlet Gum",
            "#43302e":"Old Burgundy",
            "#433120":"Iroko",
            "#433e37":"Armadillo",
            "#434c59":"River Bed",
            "#436a0d":"Green Leaf",
            "#436b95":"Queen Blue",
            "#43b3ae":"Verdigris",
            "#44012d":"Barossa",
            "#441d00":"Morocco Brown",
            "#444954":"Mako",
            "#444c38":"Rifle Green",
            "#446ccf":"Han Blue",
            "#44d7a8":"Eucalyptus",
            "#454936":"Kelp",
            "#456cac":"San Marino",
            "#45b1e8":"Picton Blue",
            "#460b41":"Loulou",
            "#462425":"Crater Brown",
            "#465945":"Gray Asparagus",
            "#4682b4":"Steel Blue",
            "#4682bf":"Cyan Blue Azure",
            "#46cb18":"Harlequin Green",
            "#47abcc":"Maximum Blue",
            "#480404":"Rustic Red",
            "#480607":"Bulgarian Rose",
            "#480656":"Clairvoyant",
            "#481c1c":"Cocoa Bean",
            "#483131":"Woody Brown",
            "#483c32":"Taupe",
            "#483d8b":"Dark Slate Blue",
            "#48bf91":"Ocean Green",
            "#48d1cc":"Medium Turquoise",
            "#49170c":"Van Cleef",
            "#492615":"Brown Derby",
            "#49371b":"Metallic Bronze",
            "#495400":"Verdun Green",
            "#496679":"Blue Bayoux",
            "#497183":"Bismark",
            "#49796b":"Hookers Green",
            "#4997d0":"Celestial Blue",
            "#4a2a04":"Bracken",
            "#4a3004":"Deep Bronze",
            "#4a3c30":"Mondo",
            "#4a4244":"Tundora",
            "#4a444b":"Gravel",
            "#4a4e5a":"Trout",
            "#4a5d23":"Dark Moss Green",
            "#4a646c":"Deep Space Sparkle",
            "#4aff00":"Chlorophyll Green",
            "#4b0082":"Indigo",
            "#4b3621":"Cafe Noir",
            "#4b5320":"Army Green",
            "#4b5d52":"Nandor",
            "#4bc7cf":"Sea Serpent",
            "#4c2882":"Spanish Violet",
            "#4c3024":"Saddle",
            "#4c4f56":"Abbey",
            "#4c516d":"Independence",
            "#4c9141":"May Green",
            "#4cbb17":"Kelly Green",
            "#4d0135":"Blackberry",
            "#4d0a18":"Cab Sav",
            "#4d1e01":"Indian Tan",
            "#4d282d":"Cowboy",
            "#4d282e":"Livid Brown",
            "#4d3833":"Rock",
            "#4d3d14":"Punga",
            "#4d400f":"Bronzetone",
            "#4d5328":"Woodland",
            "#4d5d53":"Feldgrau",
            "#4e1609":"French Puce",
            "#4e2a5a":"Bossanova",
            "#4e3b41":"Matterhorn",
            "#4e420c":"Bronze Olive",
            "#4e4562":"Mulled Wine",
            "#4e5180":"Purple Navy",
            "#4e6649":"Axolotl",
            "#4e7f9e":"Wedgewood",
            "#4e82b4":"Cyan Azure",
            "#4eabd1":"Shakespeare",
            "#4f1c70":"Honey Flower",
            "#4f2398":"Daisy Bush",
            "#4f3a3c":"Dark Puce",
            "#4f42b5":"Ocean Blue",
            "#4f666a":"Stormcloud",
            "#4f7942":"Fern Green",
            "#4f86f7":"Blueberry",
            "#4f9d5d":"Fruit Salad",
            "#4fa83d":"Apple",
            "#50404d":"Purple Taupe",
            "#504351":"Mortar",
            "#507096":"Kashmir Blue",
            "#5072a7":"Blue Yonder",
            "#507672":"Cutty Sark",
            "#507d2a":"Sap Green",
            "#50c878":"Emerald",
            "#514649":"Emperor",
            "#51484f":"Quartz",
            "#516e3d":"Chalet Green",
            "#517c66":"Como",
            "#51808f":"Smalt Blue",
            "#52001f":"Castro",
            "#520c17":"Maroon Oak",
            "#5218fa":"Han Purple",
            "#522d80":"Regalia",
            "#523c94":"Gigas",
            "#533455":"Voodoo",
            "#534491":"Victoria",
            "#534b4f":"Dark Liver",
            "#536872":"Cadet",
            "#536878":"Paynes Grey",
            "#536895":"UCLA Blue",
            "#53824b":"Hippie Green",
            "#541012":"Heath",
            "#543d37":"Horses",
            "#544333":"Judge Gray",
            "#54534d":"Fuscous Gray",
            "#545aa7":"Liberty",
            "#54626f":"Black Coral",
            "#549019":"Vida Loca",
            "#55280c":"Cioccolato",
            "#553592":"Blue Magenta Violet",
            "#555555":"Davys Grey",
            "#555b10":"Saratoga",
            "#555d50":"Ebony",
            "#556b2f":"Dark Olive Green",
            "#556d56":"Finlandia",
            "#5590d9":"Havelock Blue",
            "#560319":"Dark Scarlet",
            "#563c5c":"Old Heliotrope",
            "#568203":"Avocado",
            "#56887d":"Wintergreen Dream",
            "#56a0d3":"Carolina Blue",
            "#56b4be":"Fountain Blue",
            "#578363":"Spring Leaves",
            "#58427c":"Cyber Grape",
            "#585562":"Scarpa Flow",
            "#587156":"Cactus",
            "#589aaf":"Hippie Blue",
            "#591d35":"Wine Berry",
            "#59260b":"Seal Brown",
            "#592720":"Caput Mortuum",
            "#592804":"Brown Bramble",
            "#593737":"Congo Brown",
            "#594433":"Millbrook",
            "#5946b2":"Plump Purple",
            "#5a4fcf":"Iris",
            "#5a6e9c":"Waikawa Gray",
            "#5a87a0":"Horizon",
            "#5b3013":"Jambalaya",
            "#5b3256":"Japanese Violet",
            "#5b92e5":"United Nations Blue",
            "#5c0120":"Bordeaux",
            "#5c0536":"Mulberry Wood",
            "#5c2e01":"Carnaby Tan",
            "#5c5d75":"Comet",
            "#5d3954":"Dark Byzantium",
            "#5d4c51":"Don Juan",
            "#5d5c58":"Chicago",
            "#5d7747":"Dingley",
            "#5d89ba":"Silver Lake Blue",
            "#5d8aa8":"Royal Air Force Blue",
            "#5da19f":"Breaker Bay",
            "#5da493":"Polished Pine",
            "#5dadec":"Blue Jeans",
            "#5e483e":"Kabul",
            "#5e5d3b":"Hemlock",
            "#5f3d26":"Irish Coffee",
            "#5f5f6e":"Mid Gray",
            "#5f6672":"Shuttle Gray",
            "#5f8a8b":"Steel Teal",
            "#5f9ea0":"Cadet Blue",
            "#5fa777":"Aqua Forest",
            "#5fa778":"Shiny Shamrock",
            "#5fb3ac":"Tradewind",
            "#602f6b":"Imperial",
            "#604913":"Horses Neck",
            "#6050dc":"Majorelle Blue",
            "#605b73":"Smoky",
            "#606e68":"Corduroy",
            "#6082b6":"Glaucous",
            "#6093d1":"Danube",
            "#612718":"Espresso",
            "#614051":"Eggplant",
            "#615d30":"Costa Del Sol",
            "#61845f":"Glade Green",
            "#622f30":"Buccaneer",
            "#623f2d":"Quincy",
            "#624e9a":"Butterfly Bush",
            "#625119":"West Coast",
            "#626649":"Finch",
            "#635147":"Umber",
            "#639a8f":"Patina",
            "#63b76c":"Fern",
            "#644117":"Pullman Brown",
            "#645452":"Wenge",
            "#646077":"Dolphin",
            "#646463":"Storm Dust",
            "#646a54":"Siam",
            "#646e75":"Nevada",
            "#6495ed":"Cornflower Blue",
            "#64ccdb":"Viking",
            "#64e986":"Very Light Malachite Green",
            "#65000b":"Rosewood",
            "#651a14":"Cherrywood",
            "#654321":"Dark Brown",
            "#657220":"Fern Frond",
            "#65745d":"Willow Grove",
            "#65869f":"Hoki",
            "#660045":"Pompadour",
            "#66023c":"Tyrian Purple",
            "#663399":"Rebecca Purple",
            "#663854":"Halayà Úbe",
            "#664228":"Van Dyke Brown",
            "#66424d":"Deep Tuscan Red",
            "#664c28":"Donkey Brown",
            "#665d1e":"Antique Bronze",
            "#666699":"Dark Blue Gray",
            "#6666ff":"Very Light Blue",
            "#669999":"Desaturated Cyan",
            "#6699cc":"Blue Gray",
            "#66b032":"RYB Green",
            "#66b58f":"Silver Tree",
            "#66ddaa":"Medium Aquamarine",
            "#66ff00":"Bright Green",
            "#66ff66":"Screamin Green",
            "#67032d":"Black Rose",
            "#673147":"Wine Dregs",
            "#674846":"Rose Ebony",
            "#674c47":"Liver",
            "#675fa6":"Scampi",
            "#676662":"Ironside Gray",
            "#676767":"Granite Gray",
            "#679267":"Russian Green",
            "#67a712":"Christi",
            "#682860":"Palatinate Purple",
            "#683600":"Nutmeg Wood Finish",
            "#685558":"Zambezi",
            "#685e6e":"Salt Box",
            "#692545":"Tawny Port",
            "#692d54":"Finn",
            "#69359c":"Purple Heart",
            "#695f62":"Scorpion",
            "#696969":"Dim Gray",
            "#697e9a":"Lynch",
            "#6a442e":"Spice",
            "#6a5acd":"Slate Blue",
            "#6a5d1b":"Himalaya",
            "#6a6051":"Soya Bean",
            "#6b2a14":"Hairy Heath",
            "#6b4423":"Kobicha",
            "#6b4e31":"Shingle Fawn",
            "#6b5755":"Dorado",
            "#6b8ba2":"Bermuda Gray",
            "#6b8e23":"Olive Drab",
            "#6c2e1f":"Organ",
            "#6c3082":"Eminence",
            "#6c541e":"Field Drab",
            "#6ca0dc":"Little Boy Blue",
            "#6d0101":"Lonestar",
            "#6d5e54":"Pine Cone",
            "#6d6c6c":"Dove Gray",
            "#6d9292":"Juniper",
            "#6d92a1":"Gothic",
            "#6d9bc3":"Cerulean Frost",
            "#6e0902":"Red Oxide",
            "#6e1d14":"Moccaccino",
            "#6e4826":"Pickled Bean",
            "#6e4b26":"Dallas",
            "#6e6d57":"Kokoda",
            "#6e6ef9":"Dark Imperial Blue",
            "#6e7783":"Pale Sky",
            "#6e7f80":"Auro Metal Saurus",
            "#6eaea1":"Green Sheen",
            "#6f00ff":"Electric Indigo",
            "#6f2da8":"Grape",
            "#6f440c":"Cafe Royale",
            "#6f4e37":"Coffee",
            "#6f6a61":"Flint",
            "#6f8e63":"Highland",
            "#6f9d02":"Limeade",
            "#6fd0c5":"Downy",
            "#701c1c":"Persian Plum",
            "#702670":"Midnight",
            "#702963":"Byzantium",
            "#703642":"Catawba",
            "#704214":"Sepia",
            "#704241":"Roast Coffee",
            "#704f50":"Ferra",
            "#708090":"Slate Gray",
            "#711a00":"Cedar Wood Finish",
            "#71291d":"Metallic Copper",
            "#714693":"Affair",
            "#714ab2":"Studio",
            "#715d47":"Tobacco Brown",
            "#716338":"Yellow Metal",
            "#716b56":"Peat",
            "#716e10":"Olivetone",
            "#717486":"Storm Gray",
            "#718080":"Sirocco",
            "#71a6d2":"Iceberg",
            "#71d9e2":"Aquamarine Blue",
            "#722f37":"Wine",
            "#724a2f":"Old Copper",
            "#726d4e":"Go Ben",
            "#727472":"Nickel",
            "#727b89":"Raven",
            "#72a0c1":"Air Superiority Blue",
            "#731e8f":"Seance",
            "#734f96":"Dark Lavender",
            "#736c9f":"Kimberly",
            "#736d58":"Crocodile",
            "#737000":"Bronze Yellow",
            "#737829":"Crete",
            "#738276":"Smoke",
            "#738678":"Xanadu",
            "#73a9c2":"Moonstone Blue",
            "#73c2fb":"Maya Blue",
            "#74640d":"Spicy Mustard",
            "#746cc0":"Toolbox",
            "#747d63":"Limed Ash",
            "#747d83":"Rolling Stone",
            "#748881":"Blue Smoke",
            "#749378":"Laurel",
            "#74bbfb":"Very Light Azure",
            "#74c365":"Mantis",
            "#755a57":"Russett",
            "#7563a8":"Deluge",
            "#757575":"Sonic Silver",
            "#76395d":"Cosmic",
            "#7666c6":"Blue Marguerite",
            "#76bd17":"Lima",
            "#770f05":"Dark Burgundy",
            "#771f1f":"Crown of Thorns",
            "#773f1a":"Walnut",
            "#776f61":"Pablo",
            "#777696":"Rhythm",
            "#778120":"Pacifika",
            "#778899":"Light Slate Gray",
            "#778ba5":"Shadow Blue",
            "#779e86":"Oxley",
            "#779ecb":"Dark Pastel Blue",
            "#77b5fe":"French Sky Blue",
            "#77dd77":"Pastel Green",
            "#780109":"Japanese Maple",
            "#78184a":"Pansy Purple",
            "#782d19":"Mocha",
            "#782f16":"Peanut",
            "#7851a9":"Royal Purple",
            "#78866b":"Camouflage Green",
            "#788a25":"Wasabi",
            "#788bba":"Ship Cove",
            "#78a39c":"Sea Nymph",
            "#79443b":"Bole",
            "#795d4c":"Roman Coffee",
            "#796878":"Old Lavender",
            "#796989":"Rum",
            "#796a78":"Fedora",
            "#796d62":"Sandstone",
            "#79deec":"Spray",
            "#7a013a":"Siren",
            "#7a58c1":"Fuchsia Blue",
            "#7a7a7a":"Boulder",
            "#7ac488":"De York",
            "#7b1113":"UP Maroon",
            "#7b3801":"Red Beech",
            "#7b3f00":"Chocolate",
            "#7b6608":"Yukon Gold",
            "#7b68ee":"Medium Slate Blue",
            "#7b7874":"Tapa",
            "#7b7c94":"Waterloo ",
            "#7b8265":"Flax Smoke",
            "#7b9f80":"Amulet",
            "#7bb661":"Bud Green",
            "#7c0a02":"Barn Red",
            "#7c1c05":"Kenyan Copper",
            "#7c4848":"Tuscan Red",
            "#7c7631":"Pesto",
            "#7c7b7a":"Concord",
            "#7c7b82":"Jumbo",
            "#7c881a":"Trendy Green",
            "#7c98ab":"Weldon Blue",
            "#7c9ed9":"Vista Blue",
            "#7ca1a6":"Gumbo",
            "#7cb0a1":"Acapulco",
            "#7cb7bb":"Neptune",
            "#7cb9e8":"Aero",
            "#7cfc00":"Lawn Green",
            "#7d2c14":"Pueblo",
            "#7da98d":"Bay Leaf",
            "#7dc8f7":"Malibu",
            "#7dd8c6":"Bermuda",
            "#7df9ff":"Electric Blue",
            "#7e3a15":"Copper Canyon",
            "#7e5e60":"Deep Taupe",
            "#7f00ff":"Violet",
            "#7f1734":"Claret",
            "#7f3a02":"Peru Tan",
            "#7f626d":"Falcon",
            "#7f7589":"Mobster",
            "#7f76d3":"Moody Blue",
            "#7fff00":"Web Chartreuse",
            "#7fffd4":"Aquamarine",
            "#800000":"Maroon",
            "#800020":"Burgundy",
            "#800080":"Purple",
            "#800b47":"Rose Bud Cherry",
            "#801818":"Falu Red",
            "#80341f":"Red Robin",
            "#80461b":"Russet",
            "#807532":"Spanish Bistre",
            "#807e79":"Friar Gray",
            "#808000":"Olive",
            "#808080":"Gray",
            "#80b3ae":"Gulf Stream",
            "#80b3c4":"Glacier",
            "#80ccea":"Seagull",
            "#80daeb":"Medium Sky Blue",
            "#811453":"French Plum",
            "#81422c":"Nutmeg",
            "#81613e":"Coyote Brown",
            "#816e71":"Spicy Pink",
            "#817377":"Empress",
            "#820000":"Deep Maroon",
            "#826644":"Raw Umber",
            "#828685":"Gunsmoke",
            "#828e84":"Mummys Tomb",
            "#828f72":"Battleship Gray",
            "#831923":"Merlot",
            "#832a0d":"Smokey Topaz",
            "#836953":"Pastel Brown",
            "#838996":"Roman Silver",
            "#83aa5d":"Chelsea Cucumber",
            "#83d0c6":"Monte Carlo",
            "#841b2d":"Antique Ruby",
            "#843f5b":"Deep Ruby",
            "#848482":"Old Silver",
            "#84a0a0":"Granny Smith",
            "#84de02":"Alien Armpit",
            "#850101":"Deep Red",
            "#856088":"Chinese Violet",
            "#856d4d":"French Bistre",
            "#85754e":"Gold Fusion",
            "#8581d9":"Chetwode Blue",
            "#858470":"Bandicoot",
            "#859faf":"Bali Hai",
            "#85bb65":"Dollar Bill",
            "#85c4cc":"Half Baked",
            "#860111":"Red Devil",
            "#8601af":"RYB Violet",
            "#863c3c":"Lotus",
            "#86483c":"Ironstone",
            "#864d1e":"Bull Shot",
            "#86560a":"Rusty Nail",
            "#86608e":"French Lilac",
            "#867e36":"Old Moss Green",
            "#868974":"Bitter",
            "#86949f":"Regent Gray",
            "#871550":"Disco",
            "#872657":"Dark Raspberry",
            "#873260":"Boysenberry",
            "#87756e":"Americano",
            "#877c7b":"Hurricane",
            "#878d91":"Oslo Gray",
            "#87a96b":"Asparagus",
            "#87ab39":"Sushi",
            "#87ceeb":"Sky Blue",
            "#87cefa":"Light Sky Blue",
            "#87d3f8":"Pale Cyan",
            "#87ff2a":"Spring Frost",
            "#880085":"Mardi Gras",
            "#8806ce":"French Violet",
            "#882d17":"Sienna",
            "#885818":"Grizzly",
            "#886221":"Kumera",
            "#88654e":"Dark Brown Tangelo",
            "#8878c3":"Ube",
            "#888387":"Suva Gray",
            "#88ace0":"Light Cobalt Blue",
            "#88d8c0":"Pearl Aqua",
            "#893456":"Camelot",
            "#893843":"Solid Pink",
            "#893f45":"Cordovan",
            "#894367":"Cannon Pink",
            "#897d6d":"Makara",
            "#89cff0":"Baby Blue",
            "#8a2be2":"Blue Violet",
            "#8a3324":"Burnt Umber",
            "#8a496b":"Twilight Lavender",
            "#8a73d6":"True V",
            "#8a795d":"Shadow",
            "#8a7f80":"Rocket Metallic",
            "#8a8360":"Clay Creek",
            "#8a8389":"Monsoon",
            "#8a8f8a":"Stack",
            "#8a9a5b":"Moss Green",
            "#8ab9f1":"Jordy Blue",
            "#8b0000":"Dark Red",
            "#8b008b":"Dark Magenta",
            "#8b00ff":"Electric Violet",
            "#8b0723":"Monarch",
            "#8b4513":"Saddle Brown",
            "#8b5f4d":"Spicy Mix",
            "#8b6b0b":"Corn Harvest",
            "#8b8470":"Olive Haze",
            "#8b847e":"Schooner",
            "#8b8589":"Taupe Gray",
            "#8b8680":"Natural Gray",
            "#8b9c90":"Mantle",
            "#8b9fee":"Portage",
            "#8ba690":"Envy",
            "#8ba8b7":"Pewter Blue",
            "#8ba9a5":"Cascade",
            "#8be6d8":"Riptide",
            "#8c055e":"Cardinal Pink",
            "#8c472f":"Mule Fawn",
            "#8c5738":"Potters Clay",
            "#8c6495":"Trendy Pink",
            "#8c92ac":"Cool Grey",
            "#8cbed6":"Dark Sky Blue",
            "#8d0226":"Paprika",
            "#8d3d38":"Sanguine Brown",
            "#8d3f3f":"Tosca",
            "#8d4e85":"Razzmic Berry",
            "#8d7662":"Cement",
            "#8d8974":"Granite Green",
            "#8da8cc":"Polo Blue",
            "#8db600":"Apple Green",
            "#8e0000":"Red Berry",
            "#8e3a59":"Quinacridone Magenta",
            "#8e4585":"Plum",
            "#8e4d1e":"Rope",
            "#8e6f70":"Opium",
            "#8e775e":"Domino",
            "#8e8190":"Mamba",
            "#8eabc1":"Nepal",
            "#8f021c":"Pohutukawa",
            "#8f3e33":"El Salva",
            "#8f4b0e":"Korma",
            "#8f8176":"Squirrel",
            "#8f9779":"Artichoke",
            "#8fbc8f":"Dark Sea Green",
            "#8fd400":"Sheen Green",
            "#901e1e":"Old Brick",
            "#905d5d":"Rose Taupe",
            "#907874":"Hemp",
            "#907b71":"Almond Frost",
            "#908d39":"Sycamore",
            "#90ee90":"Light Green",
            "#914e75":"Sugar Plum",
            "#915c83":"Antique Fuchsia",
            "#915f6d":"Mauve Taupe",
            "#918151":"Dark Tan",
            "#91a3b0":"Cadet Grey",
            "#92000a":"Sangria",
            "#922724":"Vivid Auburn",
            "#924321":"Cumin",
            "#928573":"Stonewall",
            "#928590":"Venus",
            "#92a1cf":"Ceil",
            "#933d41":"Smoky Topaz",
            "#9370db":"Medium Purple",
            "#93c572":"Pistachio",
            "#93ccea":"Light Cornflower Blue",
            "#93dfb8":"Algae Green",
            "#9400d3":"Dark Violet",
            "#944747":"Copper Rust",
            "#9457eb":"Lavender Indigo",
            "#948771":"Arrowtown",
            "#950015":"Scarlett",
            "#954535":"Chestnut",
            "#956387":"Strikemaster",
            "#959396":"Mountain Mist",
            "#960018":"Carmine",
            "#964b00":"Brown",
            "#965a3e":"Coconut",
            "#966fd6":"Dark Pastel Purple",
            "#967059":"Leather",
            "#967117":"Sand Dune",
            "#9678b6":"Purple Mountain Majesty",
            "#967bb6":"Lavender Purple",
            "#96a8a1":"Pewter",
            "#96bbab":"Summer Green",
            "#96c8a2":"Eton Blue",
            "#96ded1":"Pale Robin Egg Blue",
            "#97605d":"Au Chico",
            "#979aaa":"Manatee",
            "#97cd2d":"Atlantis",
            "#980036":"Pink Raspberry",
            "#983d61":"Vin Rouge",
            "#986960":"Dark Chestnut",
            "#987456":"Liver Chestnut",
            "#9874d3":"Lilac Bush",
            "#987654":"Pale Brown",
            "#98777b":"Bazaar",
            "#98811b":"Hacienda",
            "#98817b":"Cinereous",
            "#988d77":"Pale Oyster",
            "#989898":"Spanish Gray",
            "#98fb98":"Pale Green",
            "#98ff98":"Mint Green",
            "#990000":"Crimson Red",
            "#990066":"Fresh Eggplant",
            "#991199":"Violet Eggplant",
            "#991613":"Tamarillo",
            "#991b07":"Totem Pole",
            "#9932cc":"Dark Orchid",
            "#9955bb":"Deep Lilac",
            "#996515":"Golden Brown",
            "#996600":"Gamboge Orange",
            "#996666":"Copper Rose",
            "#9966cc":"Amethyst",
            "#997a8d":"Mountbatten Pink",
            "#99e6b3":"Teal Deer",
            "#9a3820":"Prairie Sand",
            "#9a4eae":"Purpureus",
            "#9a6e61":"Toast",
            "#9a9577":"Gurkha",
            "#9ab973":"Olivine",
            "#9ac2b8":"Shadow Green",
            "#9acd32":"Yellow Green",
            "#9b111e":"Ruby Red",
            "#9b4703":"Oregon",
            "#9b7653":"Dirt",
            "#9b870c":"Dark Yellow",
            "#9b9e8f":"Lemon Grass",
            "#9bc4e2":"Pale Cerulean",
            "#9c2542":"Big Dip Oruby",
            "#9c3336":"Stiletto",
            "#9c51b6":"Purple Plum",
            "#9c7c38":"Metallic Sunburst",
            "#9d2933":"Japanese Carmine",
            "#9d5616":"Hawaiian Tan",
            "#9dacb7":"Gull Gray",
            "#9dc209":"Limerick",
            "#9de5ff":"Anakiwa",
            "#9e1316":"Spartan Crimson",
            "#9e5302":"Chelsea Gem",
            "#9e5b40":"Sepia Skin",
            "#9e5e6f":"Rose Dust",
            "#9eb1cd":"Rock Blue",
            "#9edee0":"Morning Glory",
            "#9efd38":"French Lime",
            "#9f00c5":"Munsell Purple",
            "#9f00ff":"Vivid Violet",
            "#9f1d35":"Vivid Burgundy",
            "#9f381d":"Cognac",
            "#9f4576":"Magenta Haze",
            "#9f8170":"Beaver",
            "#9f821c":"Reef Gold",
            "#9f9f9c":"Star Dust",
            "#9fa0b1":"Santas Gray",
            "#9fa91f":"Citron",
            "#9fd7d3":"Sinbad",
            "#9fdd8c":"Feijoa",
            "#a020f0":"Veronica",
            "#a02712":"Tabasco",
            "#a0785a":"Chamoisee",
            "#a0d6b4":"Turquoise Green",
            "#a0e6ff":"Winter Wizard",
            "#a1750d":"Buttered Rum",
            "#a17a74":"Burnished Brown",
            "#a1adb5":"Hit Gray",
            "#a1c50a":"Citrus",
            "#a1caf1":"Baby Blue Eyes",
            "#a1dad7":"Aqua Island",
            "#a1e9de":"Water Leaf",
            "#a2006d":"Flirt",
            "#a23b6c":"Rouge",
            "#a26645":"Cape Palliser",
            "#a2a2d0":"Blue Bell",
            "#a2aab3":"Gray Chateau",
            "#a2add0":"Wild Blue Yonder",
            "#a2aeab":"Edward",
            "#a3807b":"Pharlap",
            "#a397b4":"Amethyst Smoke",
            "#a3c1ad":"Cambridge Blue",
            "#a3e3ed":"Blizzard Blue",
            "#a40000":"Dark Candy Apple Red",
            "#a45a52":"Redwood",
            "#a4a49d":"Delta",
            "#a4a6d3":"Wistful",
            "#a4af6e":"Green Smoke",
            "#a4c639":"Android Green",
            "#a4dded":"Non Photo Blue",
            "#a4f4f9":"Waterspout",
            "#a50b5e":"Jazzberry Jam",
            "#a52a2a":"Auburn",
            "#a57164":"Blast Off Bronze",
            "#a59b91":"Zorba",
            "#a5cb0c":"Bahia",
            "#a62f20":"Roof Terracotta",
            "#a65529":"Paarl",
            "#a67b5b":"Tuscan Tan",
            "#a68b5b":"Barley Corn",
            "#a6a29a":"Dawn",
            "#a6a6a6":"Quick Silver",
            "#a6d608":"Vivid Lime Green",
            "#a6e7ff":"Fresh Air",
            "#a72525":"Mexican Red",
            "#a75502":"Windsor Tan",
            "#a76bcf":"Rich Lavender",
            "#a7882c":"Luxor Gold",
            "#a7f432":"Green Lizard",
            "#a7fc00":"Spring Bud",
            "#a81c07":"Rufous",
            "#a83731":"Sweet Brown",
            "#a8516e":"China Rose",
            "#a85307":"Rich Gold",
            "#a86515":"Reno Sand",
            "#a86b6b":"Coral Tree",
            "#a8989b":"Dusty Gray",
            "#a899e6":"Dull Lavender",
            "#a8a589":"Tallow",
            "#a8ae9c":"Bud",
            "#a8af8e":"Locust",
            "#a8bd9f":"Norway",
            "#a8e3bd":"Chinook",
            "#a8e4a0":"Granny Smith Apple",
            "#a9203e":"Deep Carmine",
            "#a95c68":"Deep Puce",
            "#a99a86":"Grullo",
            "#a9a491":"Gray Olive",
            "#a9a9a9":"Dark Medium Gray",
            "#a9acb6":"Aluminium",
            "#a9b497":"Schist",
            "#a9ba9d":"Laurel Green",
            "#a9bdbf":"Tower Gray",
            "#a9bef2":"Perano",
            "#a9c6c2":"Opal",
            "#aa00bb":"Heliotrope Magenta",
            "#aa375a":"Night Shadz",
            "#aa381e":"Chinese Red",
            "#aa4069":"Medium Ruby",
            "#aa4203":"Fire",
            "#aa8b5b":"Muesli",
            "#aa8d6f":"Sandal",
            "#aa98a9":"Heliotrope Gray",
            "#aaa5a9":"Shady Lady",
            "#aaa9cd":"Logan",
            "#aaabb7":"Spun Pearl",
            "#aad6e6":"Regent St Blue",
            "#aaf0d1":"Magic Mint",
            "#ab0563":"Lipstick",
            "#ab274f":"Amaranth Purple",
            "#ab3472":"Royal Heath",
            "#ab4b52":"English Red",
            "#ab4e52":"Rose Vale",
            "#ab917a":"Sandrift",
            "#ab92b3":"Glossy Grape",
            "#aba0d9":"Cold Purple",
            "#aba196":"Bronco",
            "#abcdef":"Pale Cornflower Blue",
            "#ac1e44":"French Wine",
            "#ac8a56":"Limed Oak",
            "#ac91ce":"East Side",
            "#ac9e22":"Lemon Ginger",
            "#aca494":"Napa",
            "#aca586":"Hillary",
            "#aca59f":"Cloudy",
            "#acacac":"Silver Chalice",
            "#acb78e":"Swamp Green",
            "#accbb1":"Spring Rain",
            "#acdd4d":"Conifer",
            "#ace1af":"Celadon",
            "#ace5ee":"Blue Lagoon",
            "#ad4379":"Mystic Maroon",
            "#ad6f69":"Copper Penny",
            "#ad781b":"Mandalay",
            "#adbed1":"Casper",
            "#add8e6":"Light Blue",
            "#add8ff":"Belgion",
            "#addfad":"Light Moss Green",
            "#ade6c4":"Padua",
            "#adff2f":"Green Yellow",
            "#ae0c00":"Mordant Red",
            "#ae2029":"Upsdell Red",
            "#ae4560":"Hippie Pink",
            "#ae6020":"Desert",
            "#ae809e":"Bouquet",
            "#ae98aa":"Lilac Luster",
            "#aec6cf":"Pastel Blue",
            "#af002a":"Alabama Crimson",
            "#af4035":"Pale Carmine",
            "#af4d43":"Apple Blossom",
            "#af593e":"Brown Rust",
            "#af6e4d":"Brown Sugar",
            "#af8751":"Driftwood",
            "#af8f2c":"Alpine",
            "#af9f1c":"Lucky",
            "#afa09e":"Martini",
            "#afb1b8":"Bombay",
            "#afbdd9":"Pigeon Post",
            "#afeeee":"Light Turquoise",
            "#b03060":"Rich Maroon",
            "#b04c6a":"Cadillac",
            "#b05c52":"Giants Club",
            "#b05d54":"Matrix",
            "#b05e81":"Tapestry",
            "#b06500":"Ginger",
            "#b06608":"Mai Tai",
            "#b09a95":"Del Rio",
            "#b0bf1a":"Acid Green",
            "#b0c4de":"Light Steel Blue",
            "#b0e0e6":"Powder Blue",
            "#b0e313":"Inch Worm",
            "#b10000":"Bright Red",
            "#b14a0b":"Vesuvius",
            "#b1610b":"Pumpkin Skin",
            "#b16d52":"Santa Fe",
            "#b19461":"Teak",
            "#b19cd9":"Light Pastel Purple",
            "#b1e2c1":"Fringy Flower",
            "#b1f4e7":"Ice Cold",
            "#b20931":"Shiraz",
            "#b22222":"Firebrick",
            "#b284be":"African Violet",
            "#b2a1ea":"Biloba Flower",
            "#b2beb5":"Ash Grey",
            "#b2ec5d":"Inchworm",
            "#b2ffff":"Celeste",
            "#b31b1b":"Carnelian",
            "#b32d29":"Tall Poppy",
            "#b3446c":"Irresistible",
            "#b35213":"Fiery Orange",
            "#b38007":"Hot Toddy",
            "#b38b6d":"Light Taupe",
            "#b39eb5":"Pastel Purple",
            "#b3c110":"La Rioja",
            "#b43332":"Well Read",
            "#b48395":"English Lavender",
            "#b4cfd3":"Jungle Mist",
            "#b53389":"Fandango",
            "#b5651d":"Light Brown",
            "#b57281":"Turkish Rose",
            "#b57edc":"Lavender",
            "#b5a27f":"Mongoose",
            "#b5a642":"Brass",
            "#b5b35c":"Olive Green",
            "#b5d2ce":"Jet Stream",
            "#b5ecdf":"Cruise",
            "#b6316c":"Hibiscus",
            "#b666d2":"Rich Lilac",
            "#b69d98":"Thatch",
            "#b6b095":"Heathered Gray",
            "#b6baa4":"Eagle",
            "#b6d1ea":"Spindle",
            "#b6d3bf":"Gum Leaf",
            "#b7410e":"Rust",
            "#b768a2":"Pearly Purple",
            "#b76e79":"Rose Gold",
            "#b784a7":"Opera Mauve",
            "#b78727":"University Of California Gold",
            "#b78e5c":"Muddy Waters",
            "#b7a214":"Sahara",
            "#b7a458":"Husk",
            "#b7b1b1":"Nobel",
            "#b7c3d0":"Heather",
            "#b7f0be":"Madang",
            "#b80ce3":"Vivid Mulberry",
            "#b81104":"Milano Red",
            "#b86d29":"Dogs",
            "#b87333":"Copper",
            "#b8860b":"Dark Goldenrod",
            "#b8b56a":"Gimblet",
            "#b8c1b1":"Green Spring",
            "#b8c25d":"Celery",
            "#b8e0f9":"Sail",
            "#b94e48":"Deep Chestnut",
            "#b95140":"Crail",
            "#b9c46a":"Wild Willow",
            "#b9c8ac":"Rainee",
            "#b9f2ff":"Diamond",
            "#ba0101":"Guardsman Red",
            "#ba160c":"Engineering International Orange",
            "#ba450c":"Rock Spray",
            "#ba55d3":"Medium Orchid",
            "#ba6f1e":"Bourbon",
            "#ba7f03":"Pirate Gold",
            "#ba8759":"Deer",
            "#ba93d8":"Lenurple",
            "#bab1a2":"Nomad",
            "#bac7c9":"Submarine",
            "#baeef9":"Charlotte",
            "#bb3385":"Medium Red Violet",
            "#bb6528":"Ruddy Brown",
            "#bb8983":"Brandy Rose",
            "#bbb477":"Misty Moss",
            "#bbd009":"Rio Grande",
            "#bbd7c1":"Surf",
            "#bc8f8f":"Rosy Brown",
            "#bc987e":"Pale Taupe",
            "#bcb88a":"Sage",
            "#bcc9c2":"Powder Ash",
            "#bcd4e6":"Beau Blue",
            "#bd33a4":"Byzantine",
            "#bd978e":"Quicksand",
            "#bdb1a8":"Silk",
            "#bdb2a1":"Malta",
            "#bdb3c7":"Chatelle",
            "#bdb76b":"Dark Khaki",
            "#bdbdc6":"French Gray",
            "#bdc8b3":"Clay Ash",
            "#bdc9ce":"Loblolly",
            "#bdda57":"June Bud",
            "#bdedfd":"French Pass",
            "#be0032":"Crimson Glory",
            "#be4f62":"Popstar",
            "#bea6c3":"London Hue",
            "#beb5b7":"Pink Swan",
            "#bebebe":"X11 Gray",
            "#bede0d":"Fuego",
            "#bf00ff":"Electric Purple",
            "#bf4f51":"Bittersweet Shimmer",
            "#bf5500":"Rose of Sharon",
            "#bf94e4":"Bright Lavender",
            "#bfafb2":"Black Shadows",
            "#bfb8b0":"Tide",
            "#bfbed8":"Blue Haze",
            "#bfc1c2":"Silver Sand",
            "#bfc921":"Key Lime Pie",
            "#bfdbe2":"Ziggurat",
            "#bfff00":"Lime",
            "#c02b18":"Thunderbird",
            "#c0362c":"Golden Gate Bridge",
            "#c04000":"Mahogany",
            "#c04737":"Mojo",
            "#c08081":"Old Rose",
            "#c09999":"Tuscany",
            "#c0c0c0":"Silver",
            "#c0d3b9":"Pale Leaf",
            "#c0d8b6":"Pixie Green",
            "#c1440e":"Tia Maria",
            "#c154c1":"Deep Fuchsia",
            "#c19a6b":"Fallow",
            "#c1a004":"Buddha Gold",
            "#c1b7a4":"Bison Hide",
            "#c1bab0":"Tea",
            "#c1becd":"Gray Suit",
            "#c1d7b0":"Sprout",
            "#c1f07c":"Sulu",
            "#c21e56":"Rose Red",
            "#c23b22":"Dark Pastel Red",
            "#c26b03":"Indochine",
            "#c2955d":"Twine",
            "#c2b280":"Ecru",
            "#c2bdb6":"Cotton Seed",
            "#c2cac4":"Pumice",
            "#c2e8e5":"Jagged Ice",
            "#c30b4e":"Pictorial Carmine",
            "#c32148":"Bright Maroon",
            "#c39953":"Aztec Gold",
            "#c3b091":"Khaki",
            "#c3bfc1":"Pale Slate",
            "#c3c3bd":"Gray Nickel",
            "#c3cde6":"Periwinkle Gray",
            "#c3d1d1":"Tiara",
            "#c3ddf9":"Tropical Blue",
            "#c40233":"NCS Red",
            "#c41e3a":"Cardinal",
            "#c45655":"Fuzzy Wuzzy Brown",
            "#c45719":"Orange Roughy",
            "#c46210":"Alloy Orange",
            "#c4aead":"Silver Pink",
            "#c4c3d0":"Lavender Gray",
            "#c4c4bc":"Mist Gray",
            "#c4d0b0":"Coriander",
            "#c4d8e2":"Columbia Blue",
            "#c4f4eb":"Mint Tulip",
            "#c53151":"Dingy Dungeon",
            "#c54b8c":"Mulberry",
            "#c59922":"Nugget",
            "#c5994b":"Tussock",
            "#c5b358":"Vegas Gold",
            "#c5dbca":"Sea Mist",
            "#c6726b":"Contessa",
            "#c69191":"Oriental Pink",
            "#c6a84b":"Roti",
            "#c6c3b5":"Ash",
            "#c6c8bd":"Kangaroo",
            "#c6e610":"Las Palmas",
            "#c7031e":"Monza",
            "#c71585":"Red Violet",
            "#c72c48":"French Raspberry",
            "#c74375":"Fuchsia Rose",
            "#c7bca2":"Coral Reef",
            "#c7c1ff":"Melrose",
            "#c7c4bf":"Cloud",
            "#c7c9d5":"Ghost",
            "#c7cd90":"Pine Glade",
            "#c7dde5":"Botticelli",
            "#c80815":"Venetian Red",
            "#c84186":"Smitten",
            "#c8a2c8":"Lilac",
            "#c8a528":"Hokey Pokey",
            "#c8aabf":"Lily",
            "#c8ad7f":"Light French Beige",
            "#c8b568":"Laser",
            "#c8e3d7":"Edgewater",
            "#c90016":"Harvard Crimson",
            "#c95a49":"Cedar Chest",
            "#c96323":"Piper",
            "#c99415":"Pizza",
            "#c9a0dc":"Wisteria",
            "#c9b29b":"Rodeo Dust",
            "#c9b35b":"Sundance",
            "#c9b93b":"Earls Green",
            "#c9c0bb":"Pale Silver",
            "#c9d9d2":"Conch",
            "#c9dc87":"Medium Spring Bud",
            "#c9ffa2":"Reef",
            "#c9ffe5":"Aero Blue",
            "#ca1f7b":"Magenta",
            "#ca2c92":"Royal Fuchsia",
            "#ca3435":"Flush Mahogany",
            "#cabb48":"Turmeric",
            "#cadcd4":"Paris White",
            "#cae00d":"Bitter Lemon",
            "#cae6da":"Skeptic",
            "#cb410b":"Sinopia",
            "#cb4154":"Brick Red",
            "#cb6d51":"Copper Red",
            "#cb8fa9":"Viola",
            "#cb99c9":"Pastel Violet",
            "#cba135":"Satin Sheen Gold",
            "#cbcab6":"Foggy Gray",
            "#cbd3b0":"Green Mist",
            "#cbdbd6":"Nebula",
            "#cc0000":"Boston University Red",
            "#cc0033":"Vivid Crimson",
            "#cc00cc":"Deep Magenta",
            "#cc00ff":"Vivid Orchid",
            "#cc3333":"Persian Red",
            "#cc338b":"Magenta Pink",
            "#cc33cc":"Steel Pink",
            "#cc397b":"Fuchsia Purple",
            "#cc474b":"English Vermillion",
            "#cc4e5c":"Dark Terra Cotta",
            "#cc5500":"Burnt Orange",
            "#cc6666":"Fuzzy Wuzzy",
            "#cc7722":"Ochre",
            "#cc8899":"Puce",
            "#cc9900":"Vivid Amber",
            "#cc9966":"Brown Yellow",
            "#cc99cc":"Light Grayish Magenta",
            "#cc99ff":"Pale Violet",
            "#cca01d":"Lemon Curry",
            "#cccaa8":"Thistle Green",
            "#ccccff":"Periwinkle",
            "#ccff00":"Electric Lime",
            "#cd5700":"Tenne",
            "#cd5b45":"Dark Coral",
            "#cd5c5c":"Indian Red",
            "#cd607e":"Cinnamon Satin",
            "#cd7f32":"Bronze",
            "#cd8429":"Brandy Punch",
            "#cd853f":"Peru",
            "#cd9575":"Antique Brass",
            "#cda4de":"Tropical Violet",
            "#cdf4ff":"Onahau",
            "#ce2029":"Fire Engine Red",
            "#ce4676":"Ruber",
            "#ceb98f":"Sorrell Brown",
            "#cebaba":"Cold Turkey",
            "#cec291":"Yuma",
            "#cec7a7":"Chino",
            "#cec8ef":"Soap",
            "#ceff00":"Volt",
            "#cf1020":"Lava",
            "#cf3476":"Telemagenta",
            "#cf6ba9":"Super Pink",
            "#cf71af":"Sky Magenta",
            "#cfa39d":"Eunry",
            "#cfb53b":"Old Gold",
            "#cfcfc4":"Pastel Gray",
            "#cfdccf":"Tasman",
            "#cfe5d2":"Surf Crest",
            "#cff9f3":"Humming Bird",
            "#cffaf4":"Scandal",
            "#d0417e":"Pantone Magenta",
            "#d05f04":"Red Stage",
            "#d06da1":"Hopbush",
            "#d07d12":"Meteor",
            "#d0bef8":"Perfume",
            "#d0c0e5":"Prelude",
            "#d0f0c0":"Tea Green",
            "#d0ff14":"Arctic Lime",
            "#d10047":"Spanish Carmine",
            "#d10056":"Rubine Red",
            "#d18f1b":"Geebung",
            "#d19fe8":"Bright Ube",
            "#d1bea8":"Dark Vanilla",
            "#d1c6b4":"Soft Amber",
            "#d1d2dd":"Mischka",
            "#d1e231":"Pear",
            "#d2691e":"Cocoa Brown",
            "#d29eaa":"Careys Pink",
            "#d2b48c":"Tan",
            "#d2da97":"Deco",
            "#d2f6de":"Blue Romance",
            "#d2f8b0":"Gossip",
            "#d3003f":"Utah Crimson",
            "#d3212d":"Amaranth Red",
            "#d39bcb":"Light Medium Orchid",
            "#d3cbba":"Sisal",
            "#d3cdc5":"Swirl",
            "#d3d3d3":"Light Gray",
            "#d40000":"Rosso Corsa",
            "#d470a2":"Wild Orchid",
            "#d473d4":"French Mauve",
            "#d47494":"Charm",
            "#d4af37":"Metallic Gold",
            "#d4b6af":"Clam Shell",
            "#d4c4a8":"Akaroa",
            "#d4cd16":"Bird Flower",
            "#d4d7d9":"Iron",
            "#d4dfe2":"Geyser",
            "#d4e2fc":"Hawkes Blue",
            "#d54600":"Grenadier",
            "#d591a4":"Can Can",
            "#d59a6f":"Whiskey",
            "#d5d195":"Winter Hazel",
            "#d5f6e3":"Granny Apple",
            "#d65282":"Mystic",
            "#d68a59":"Raw Sienna",
            "#d69188":"My Pink",
            "#d6c562":"Tacha",
            "#d6cadd":"Languid Lavender",
            "#d6cef6":"Moon Raker",
            "#d6d6d1":"Quill Gray",
            "#d6ffdb":"Snowy Mint",
            "#d70040":"Rich Carmine",
            "#d70a53":"Debian Red",
            "#d71868":"Dogwood Rose",
            "#d73b3e":"Jasper",
            "#d74894":"Pantone Pink",
            "#d7837f":"New York Pink",
            "#d7c498":"Pavlova",
            "#d7d0ff":"Fog",
            "#d84437":"Valencia",
            "#d87c63":"Japonica",
            "#d891ef":"Bright Lilac",
            "#d8b2d1":"Pink Lavender",
            "#d8bfd8":"Thistle",
            "#d8c2d5":"Maverick",
            "#d8fcfa":"Foam",
            "#d9004c":"UA Red",
            "#d92121":"Maximum red",
            "#d9381e":"Vermilion",
            "#d94972":"Cabaret",
            "#d9603b":"Medium Vermilion",
            "#d98695":"Shimmering Blush",
            "#d99058":"Persian Orange",
            "#d99376":"Burning Sand",
            "#d9b99b":"Cameo",
            "#d9dcc1":"Tana",
            "#d9e4f5":"Link Water",
            "#d9f7ff":"Mabel",
            "#da1d81":"Vivid Cerise",
            "#da2c43":"Rusty Red",
            "#da3287":"Deep Cerise",
            "#da5b38":"Flame Pea",
            "#da614e":"Jelly Bean",
            "#da6304":"Bamboo",
            "#da6a41":"Red Damask",
            "#da70d6":"Orchid",
            "#da8a67":"Pale Copper",
            "#da9100":"Harvest Gold",
            "#daa520":"Goldenrod",
            "#daecd6":"Zanah",
            "#dafaff":"Oyster Bay",
            "#db5079":"Cranberry",
            "#db7093":"Pale Red Violet",
            "#db9690":"Petite Orchid",
            "#db995e":"Di Serria",
            "#dbd7d2":"Timberwolf",
            "#dbdbdb":"Alto",
            "#dbe9f4":"Azureish White",
            "#dbfff8":"Frosted Mint",
            "#dc143c":"Crimson",
            "#dc4333":"Punch",
            "#dcb20c":"Galliano",
            "#dcb4bc":"Blossom",
            "#dcd0ff":"Pale Lavender",
            "#dcd747":"Wattle",
            "#dcd9d2":"Westar",
            "#dcdcdc":"Gainsboro",
            "#dcddcc":"Moon Mist",
            "#dcedb4":"Caper",
            "#dcf0ea":"Swans Down",
            "#dda0dd":"Pale Plum",
            "#ddadaf":"Pale Chestnut",
            "#ddd6d5":"Swiss Coffee",
            "#dde26a":"Booger Buster",
            "#ddf9f1":"White Ice",
            "#de3163":"Cerise",
            "#de5285":"Fandango Pink",
            "#de5d83":"Blush",
            "#de6360":"Roman",
            "#de6fa1":"Thulian Pink",
            "#dea5a4":"Pastel Pink",
            "#deaa88":"Tumbleweed",
            "#deb887":"Burlywood",
            "#deba13":"Gold Tips",
            "#dec196":"Brandy",
            "#decbc6":"Wafer",
            "#ded4a4":"Sapling",
            "#ded717":"Barberry",
            "#dee5c0":"Beryl Green",
            "#def5ff":"Pattens Blue",
            "#df00ff":"Psychedelic Purple",
            "#df6124":"Vivid Red Tangelo",
            "#df73ff":"Heliotrope",
            "#dfbe6f":"Apache",
            "#dfcd6f":"Chenin",
            "#dfcfdb":"Lola",
            "#dfecda":"Willow Brook",
            "#dfff00":"Chartreuse",
            "#e0115f":"Ruby",
            "#e0218a":"Barbie Pink",
            "#e03c31":"CG Red",
            "#e08d3c":"Tigers Eye",
            "#e0b0ff":"Mauve",
            "#e0b646":"Anzac",
            "#e0c095":"Calico",
            "#e0ffff":"Light Cyan",
            "#e12c2c":"Permanent Geranium Lake",
            "#e16865":"Sunglo",
            "#e18e96":"Ruddy Pink",
            "#e1a95f":"Earth Yellow",
            "#e1ad21":"Urobilin",
            "#e1bc64":"Equator",
            "#e1c0c8":"Pink Flare",
            "#e1e6d6":"Periglacial Blue",
            "#e1ead4":"Kidnapper",
            "#e1f6e8":"Tara",
            "#e2062c":"Medium Candy Apple Red",
            "#e25098":"Raspberry Pink",
            "#e25465":"Mandy",
            "#e25822":"Flame",
            "#e2725b":"Terra Cotta",
            "#e28913":"Golden Bell",
            "#e292c0":"Shocking",
            "#e29418":"Dixie",
            "#e2d8ed":"Snuff",
            "#e30022":"Cadmium Red",
            "#e30b5d":"Raspberry",
            "#e3256b":"Razzmatazz",
            "#e32636":"Alizarin Crimson",
            "#e34234":"Cinnabar",
            "#e3a857":"Indian Yellow",
            "#e3ab57":"Sunray",
            "#e3bebe":"Cavern Pink",
            "#e3dac9":"Bone",
            "#e3f5e1":"Peppermint",
            "#e3f988":"Mindaro",
            "#e3ff00":"Lemon Lime",
            "#e40078":"Red Purple",
            "#e4007c":"Mexican Pink",
            "#e4717a":"Tango Pink",
            "#e47698":"Deep Blush",
            "#e48400":"Fulvous",
            "#e49b0f":"Gamboge",
            "#e4c2d5":"Melanie",
            "#e4cfde":"Twilight",
            "#e4d00a":"Citrine",
            "#e4d422":"Sunflower",
            "#e4d5b7":"Grain Brown",
            "#e4d69b":"Zombie",
            "#e4d96f":"Straw",
            "#e4f6e7":"Frostee",
            "#e4ffd1":"Snow Flurry",
            "#e51a4c":"Spanish Crimson",
            "#e52b50":"Amaranth",
            "#e56024":"Vivid Vermilion",
            "#e5841b":"Zest",
            "#e5aa70":"Fawn",
            "#e5b73b":"Meat Brown",
            "#e5ccc9":"Dust Storm",
            "#e5d7bd":"Stark White",
            "#e5d8af":"Hampton",
            "#e5e0e1":"Bon Jour",
            "#e5e4e2":"Platinum",
            "#e5e5e5":"Mercury",
            "#e5f9f6":"Polar",
            "#e60026":"Spanish Red",
            "#e62020":"Lust",
            "#e63e62":"Paradise Pink",
            "#e64e03":"Trinidad",
            "#e66771":"Light Carmine Pink",
            "#e68fac":"Charm Pink",
            "#e6a8d7":"Light Orchid",
            "#e6be8a":"Pale Gold",
            "#e6bea5":"Cashmere",
            "#e6d7b9":"Double Spanish White",
            "#e6e200":"Peridot",
            "#e6e4d4":"Satin Linen",
            "#e6e6fa":"Lavender Mist",
            "#e6e8fa":"Glitter",
            "#e6f2ea":"Harp",
            "#e6f8f3":"Off Green",
            "#e6ffe9":"Hint of Green",
            "#e6ffff":"Tranquil",
            "#e75480":"Dark Pink",
            "#e7730a":"Christine",
            "#e79f8c":"Tonys Pink",
            "#e79fc4":"Kobi",
            "#e7accf":"Pink Pearl",
            "#e7bcb4":"Rose Fog",
            "#e7bf05":"Corn",
            "#e7cd8c":"Putty",
            "#e7ece6":"Gray Nurse",
            "#e7f8ff":"Lily White",
            "#e7feff":"Bubbles",
            "#e8000d":"KU Crimson",
            "#e86100":"Spanish Orange",
            "#e88e5a":"Big Foot Feet",
            "#e89928":"Fire Bush",
            "#e8b9b3":"Shilo",
            "#e8ccd7":"Queen Pink",
            "#e8e0d5":"Pearl Bush",
            "#e8ebe0":"Green White",
            "#e8f1d4":"Chrome White",
            "#e8f2eb":"Gin",
            "#e8f48c":"Key Lime",
            "#e8f5f2":"Aqua Squeeze",
            "#e936a7":"Frostbite",
            "#e9692c":"Deep Carrot Orange",
            "#e96e00":"Clementine",
            "#e97451":"Burnt Sienna",
            "#e97c07":"Tahiti Gold",
            "#e9967a":"Dark Salmon",
            "#e9cecd":"Oyster Pink",
            "#e9d66b":"Arylide Yellow",
            "#e9d75a":"Confetti",
            "#e9e3e3":"Ebb",
            "#e9f8ed":"Ottoman",
            "#e9ffdb":"Nyanza",
            "#e9fffd":"Clear Day",
            "#ea3c53":"Desire",
            "#ea88a8":"Carissma",
            "#eaa221":"Marigold",
            "#eaae69":"Porsche",
            "#eab33b":"Tulip Tree",
            "#eac674":"Rob Roy",
            "#eadab8":"Raffia",
            "#eae0c8":"Pearl",
            "#eae8d4":"White Rock",
            "#eaf6ee":"Panache",
            "#eaf6ff":"Solitude",
            "#eaf9f5":"Aqua Spring",
            "#eafffe":"Dew",
            "#eb4c42":"Carmine Pink",
            "#ebc2af":"Zinnwaldite",
            "#ec3b83":"Cerise Pink",
            "#ec5800":"Persimmon",
            "#eca927":"Fuel Yellow",
            "#ecc54e":"Ronchi",
            "#eccdb9":"Just Right",
            "#ecd540":"Sandstorm",
            "#ece090":"Wild Rice",
            "#ecebbd":"Pale Spring Bud",
            "#ecebce":"Aths Special",
            "#ecf245":"Starship",
            "#ed0a3f":"Red Ribbon",
            "#ed1c24":"Pigment Red",
            "#ed2939":"Imperial Red",
            "#ed7a1c":"Tango",
            "#ed872d":"Cadmium Orange",
            "#ed9121":"Carrot Orange",
            "#ed989e":"Sea Pink",
            "#edb381":"Tacao",
            "#edc9af":"Desert Sand",
            "#edcdab":"Pancho",
            "#eddcb1":"Chamois",
            "#edea99":"Primrose",
            "#edf5dd":"Frost",
            "#edf5f5":"Aqua Haze",
            "#edf6ff":"Zumthor",
            "#edf9f1":"Narvik",
            "#edfc84":"Honeysuckle",
            "#ee204d":"Crayola Red",
            "#ee82ee":"Lavender Magenta",
            "#eec1be":"Beauty Bush",
            "#eed202":"Safety Yellow",
            "#eed794":"Chalky",
            "#eedc82":"Flax",
            "#eededa":"Bizarre",
            "#eee3ad":"Double Colonial White",
            "#eee600":"Titanium Yellow",
            "#eee8aa":"Pale Goldenrod",
            "#eeeee8":"Cararra",
            "#eeef78":"Manz",
            "#eef0c8":"Tahuna Sands",
            "#eef0f3":"Athens Gray",
            "#eef3c3":"Tusk",
            "#eef4de":"Loafer",
            "#eef6f7":"Catskill White",
            "#eefdff":"Twilight Blue",
            "#eeffe2":"Rice Flower",
            "#ef3038":"Deep Carmine Pink",
            "#ef863f":"Jaffa",
            "#ef98aa":"Mauvelous",
            "#efbbcc":"Cameo Pink",
            "#efcc00":"Munsell Yellow",
            "#efdecd":"Almond",
            "#efdfbb":"Dutch White",
            "#efefef":"Gallery",
            "#eff2f3":"Porcelain",
            "#f07427":"Vivid Tangelo",
            "#f08080":"Light Coral",
            "#f0d52d":"Golden Dream",
            "#f0db7d":"Golden Sand",
            "#f0dc82":"Buff",
            "#f0e130":"Dandelion",
            "#f0e2ec":"Prim",
            "#f0e68c":"Light Khaki",
            "#f0ead6":"Eggshell",
            "#f0eefd":"Selago",
            "#f0eeff":"Titan White",
            "#f0f8ff":"Alice Blue",
            "#f0fcea":"Feta",
            "#f0fff0":"Honeydew",
            "#f0ffff":"Azure Mist",
            "#f18200":"Gold Drop",
            "#f19bab":"Wewak",
            "#f19cbb":"Amaranth Pink",
            "#f1a7fe":"Rich Brilliant Lavender",
            "#f1e788":"Sahara Sand",
            "#f1e9d2":"Parchment",
            "#f1e9ff":"Blue Chalk",
            "#f1eec1":"Mint Julep",
            "#f1f7f2":"Saltpan",
            "#f1ffad":"Tidal",
            "#f1ffc8":"Chiffon",
            "#f2003c":"Munsell Red",
            "#f2552a":"Flamingo",
            "#f28500":"Tangerine",
            "#f2bdcd":"Orchid Pink",
            "#f2c3b2":"Mandys Pink",
            "#f2f27a":"Sunny",
            "#f2f2f2":"Concrete",
            "#f2f3f4":"Anti Flash White",
            "#f2fafa":"Black Squeeze",
            "#f34723":"Pomegranate",
            "#f37a48":"Mandarin",
            "#f38fa9":"Vanilla Ice",
            "#f3ad16":"Buttercup",
            "#f3d69d":"New Orleans",
            "#f3e5ab":"Vanilla",
            "#f3e7bb":"Sidecar",
            "#f3e9e5":"Dawn Pink",
            "#f3edcf":"Wheatfield",
            "#f3fb62":"Canary",
            "#f3fbd4":"Orinoco",
            "#f3ffd8":"Carla",
            "#f400a1":"Fashion Fuchsia",
            "#f49ac2":"Pastel Magenta",
            "#f4a460":"Sandy Brown",
            "#f4bbff":"Brilliant Lavender",
            "#f4c2c2":"Tea Rose",
            "#f4c430":"Saffron",
            "#f4ca16":"Jonquil",
            "#f4d81c":"Ripe Lemon",
            "#f4ebd3":"Janna",
            "#f4f0ec":"Isabelline",
            "#f4f2ee":"Pampas",
            "#f4f4f4":"Wild Sand",
            "#f4f8ff":"Zircon",
            "#f56991":"Light Crimson",
            "#f56fa1":"Cyclamen",
            "#f57584":"Froly",
            "#f58025":"Princeton Orange",
            "#f5c71a":"Deep Lemon",
            "#f5c85c":"Cream Can",
            "#f5c999":"Manhattan",
            "#f5deb3":"Wheat",
            "#f5e050":"Minion Yellow",
            "#f5e7a2":"Sandwisp",
            "#f5e7e2":"Pot Pourri",
            "#f5e9d3":"Albescent White",
            "#f5edef":"Soft Peach",
            "#f5f3e5":"Ecru White",
            "#f5f5dc":"Beige",
            "#f5f5f5":"White Smoke",
            "#f5fb3d":"Golden Fizz",
            "#f5ffbe":"Australian Mint",
            "#f5fffa":"Mint Cream",
            "#f64a8a":"French Rose",
            "#f6a4c9":"Illusion",
            "#f6adc6":"Nadeshiko Pink",
            "#f6eabe":"Lemon Meringue",
            "#f6f0e6":"Merino",
            "#f6f7f7":"Black Haze",
            "#f6ffdc":"Spring Sun",
            "#f70d1a":"Vivid Red",
            "#f75394":"Violet Red",
            "#f77703":"Chilean Fire",
            "#f77f00":"University Of Tennessee Orange",
            "#f77fbe":"Persian Pink",
            "#f78fa7":"Pink Sherbet",
            "#f7bfbe":"Spanish Pink",
            "#f7c8da":"Azalea",
            "#f7dbe6":"We Peep",
            "#f7e7ce":"Champagne",
            "#f7e98e":"Flavescent",
            "#f7f2e1":"Quarter Spanish White",
            "#f7f5fa":"Whisper",
            "#f7faf7":"Snow Drift",
            "#f88379":"Congo Pink",
            "#f8b853":"Casablanca",
            "#f8b878":"Mellow Apricot",
            "#f8c3df":"Chantilly",
            "#f8d568":"Orange Yellow",
            "#f8d9e9":"Cherub",
            "#f8db9d":"Marzipan",
            "#f8dd5c":"Energy Yellow",
            "#f8de7e":"Jasmine",
            "#f8e4bf":"Givry",
            "#f8f0e8":"White Linen",
            "#f8f4ff":"Magnolia",
            "#f8f6f1":"Spring Wood",
            "#f8f7dc":"Coconut Cream",
            "#f8f7fc":"White Lilac",
            "#f8f8f7":"Desert Storm",
            "#f8f8ff":"Ghost White",
            "#f8f99c":"Texas",
            "#f8facd":"Corn Field",
            "#f8fdd3":"Mimosa",
            "#f9429e":"Rose Bonbon",
            "#f94d00":"Tangelo",
            "#f95a61":"Carnation",
            "#f984e5":"Pale Magenta",
            "#f984ef":"Light Fuchsia Pink",
            "#f9bf58":"Saffron Mango",
            "#f9e0ed":"Carousel Pink",
            "#f9e4bc":"Dairy Cream",
            "#f9e663":"Portica",
            "#f9e6f4":"Underage Pink",
            "#f9eaf3":"Amour",
            "#f9f8e4":"Rum Swizzle",
            "#f9ff8b":"Dolly",
            "#f9fff6":"Sugar Cane",
            "#fa5b3d":"Orange Soda",
            "#fa7814":"Ecstasy",
            "#fa8072":"Salmon",
            "#fa9d5a":"Tan Hide",
            "#fad3a2":"Corvette",
            "#fad6a5":"Sunset",
            "#fada5e":"Naples Yellow",
            "#fadadd":"Pale Pink",
            "#fadfad":"Peach Yellow",
            "#fae600":"Turbo",
            "#fae7b5":"Banana Mania",
            "#faeab9":"Astra",
            "#faebd7":"Antique White",
            "#faf0be":"Blond",
            "#faf0e6":"Linen",
            "#faf3f0":"Fantasy",
            "#faf7d6":"Citrine White",
            "#fafa37":"Maximum Yellow",
            "#fafad2":"Light Goldenrod Yellow",
            "#fafafa":"Alabaster",
            "#fafde4":"Hint of Yellow",
            "#faffa4":"Milan",
            "#fb4d46":"Tart Orange",
            "#fb4f14":"Orioles Orange",
            "#fb607f":"Brink Pink",
            "#fb8989":"Geraldine",
            "#fb9902":"RYB Orange",
            "#fba0e3":"Lavender Rose",
            "#fba129":"Sea Buckthorn",
            "#fbab60":"Rajah",
            "#fbac13":"Sun",
            "#fbaed2":"Lavender Pink",
            "#fbb2a3":"Rose Bud",
            "#fbbeda":"Cupid",
            "#fbcce7":"Classic Rose",
            "#fbceb1":"Apricot",
            "#fbe870":"Marigold Yellow",
            "#fbe96c":"Festival",
            "#fbea8c":"Sweet Corn",
            "#fbec5d":"Maize",
            "#fbf9f9":"Hint of Red",
            "#fbffba":"Shalimar",
            "#fc0fc0":"Shocking Pink",
            "#fc5a8d":"Strawberry",
            "#fc6c85":"Wild Watermelon",
            "#fc74fd":"Pink Flamingo",
            "#fc89ac":"Tickle Me Pink",
            "#fc8eac":"Flamingo Pink",
            "#fc9c1d":"Tree Poppy",
            "#fcc01e":"Lightning Yellow",
            "#fcc200":"Golden Poppy",
            "#fcd917":"Candlelight",
            "#fcda98":"Cherokee",
            "#fce883":"Crayola Yellow",
            "#fcf4d0":"Double Pearl Lusta",
            "#fcf4dc":"Pearl Lusta",
            "#fcf75e":"Icterine",
            "#fcf8f7":"Vista White",
            "#fcfbf3":"Bianca",
            "#fcfeda":"Moon Glow",
            "#fcffe7":"China Ivory",
            "#fcfff9":"Ceramic",
            "#fd0e35":"Tractor Red",
            "#fd3a4a":"Red Salsa",
            "#fd3f92":"French Fuchsia",
            "#fd5240":"Ogre Odor",
            "#fd5800":"Willpower Orange",
            "#fd5e53":"Sunset Orange",
            "#fd6c9e":"French Pink",
            "#fd7b33":"Crusta",
            "#fd7c07":"Sorbus",
            "#fd9fa2":"Sweet Pink",
            "#fdbcb4":"Melon",
            "#fdd5b1":"Light Apricot",
            "#fdd7e4":"Pig Pink",
            "#fddde6":"Piggy Pink",
            "#fde1dc":"Cinderella",
            "#fde295":"Golden Glow",
            "#fdee00":"Aureolin",
            "#fdf5e6":"Old Lace",
            "#fdf6d3":"Half Colonial White",
            "#fdf7ad":"Drover",
            "#fdfd96":"Pastel Yellow",
            "#fdfeb8":"Pale Prim",
            "#fdff00":"Lemon Glacier",
            "#fdffd5":"Cumulus",
            "#fe2712":"RYB Red",
            "#fe28a2":"Persian Rose",
            "#fe2e2e":"Light Brilliant Red",
            "#fe4164":"Neon Fuchsia",
            "#fe4eda":"Purple Pizzazz",
            "#fe5a1d":"Giants Orange",
            "#fe6f5e":"Bittersweet",
            "#fe9d04":"California",
            "#fea904":"Yellow Sea",
            "#fed33c":"Bright Sun",
            "#fedb8d":"Salomie",
            "#fedf00":"Pantone Yellow",
            "#fee5ac":"Cape Honey",
            "#feebf3":"Remy",
            "#feefce":"Oasis",
            "#fef0ec":"Bridesmaid",
            "#fef2c7":"Beeswax",
            "#fef3d8":"Bleach White",
            "#fef4cc":"Pipi",
            "#fef4db":"Half Spanish White",
            "#fef4f8":"Wisp Pink",
            "#fef5f1":"Provincial Pink",
            "#fef7de":"Half Dutch White",
            "#fef8e2":"Solitaire",
            "#fef8ff":"White Pointer",
            "#fef9e3":"Off Yellow",
            "#fefced":"Orange White",
            "#fefe33":"RYB Yellow",
            "#fefefa":"Baby Powder",
            "#ff0000":"Red",
            "#ff0028":"Ruddy",
            "#ff0038":"Carmine Red",
            "#ff003f":"Electric Crimson",
            "#ff004f":"Folly",
            "#ff006c":"Vivid Raspberry",
            "#ff007c":"Winter Sky",
            "#ff007f":"Rose",
            "#ff0090":"Process Magenta",
            "#ff00fd":"Metal Pink",
            "#ff00ff":"Fuchsia",
            "#ff033e":"American Rose",
            "#ff0800":"Candy Apple Red",
            "#ff1493":"Deep Pink",
            "#ff1dce":"Hot Magenta",
            "#ff2400":"Scarlet",
            "#ff2800":"Ferrari Red",
            "#ff33cc":"Razzle Dazzle Rose",
            "#ff355e":"Radical Red",
            "#ff3800":"Coquelicot",
            "#ff3855":"Sizzling Red",
            "#ff4040":"Coral Red",
            "#ff404c":"Sunburnt Cyclops",
            "#ff43a4":"Wild Strawberry",
            "#ff4466":"Magic Potion",
            "#ff4500":"Orange Red",
            "#ff4681":"Sasquatch Socks",
            "#ff4f00":"International Orange",
            "#ff5349":"Red Orange",
            "#ff5470":"Fiery Rose",
            "#ff55a3":"Brilliant Rose",
            "#ff5800":"Pantone Orange",
            "#ff5a36":"Portland Orange",
            "#ff5ccd":"Light Deep Pink",
            "#ff5f00":"Vivid Orange",
            "#ff6347":"Tomato",
            "#ff66cc":"Rose Pink",
            "#ff6700":"Blaze Orange",
            "#ff6961":"Pastel Red",
            "#ff69b4":"Hot Pink",
            "#ff6d3a":"Smashed Pumpkin",
            "#ff6e4a":"Outrageous Orange",
            "#ff6fff":"Ultra Pink",
            "#ff7034":"Burning Orange",
            "#ff7518":"Pumpkin",
            "#ff7538":"Crayola Orange",
            "#ff77ff":"Fuchsia Pink",
            "#ff7800":"Safety Orange",
            "#ff7a00":"Heat Wave",
            "#ff7d07":"Flamenco",
            "#ff7e00":"SAE ECE Amber",
            "#ff7f00":"Orange",
            "#ff7f50":"Coral",
            "#ff8243":"Mango Tango",
            "#ff85cf":"Princess Perfume",
            "#ff878d":"Tulip",
            "#ff8c00":"Dark Orange",
            "#ff9000":"Pizazz",
            "#ff910f":"West Side",
            "#ff91a4":"Salmon Pink",
            "#ff91af":"Baker Miller Pink",
            "#ff9900":"Vivid Gamboge",
            "#ff9933":"Deep Saffron",
            "#ff9966":"Pink Orange",
            "#ff9999":"Light Salmon Pink",
            "#ff99cc":"Pale Magenta Pink",
            "#ff9e2c":"Sunshade",
            "#ff9f00":"Orange Peel",
            "#ffa000":"Vivid Orange Peel",
            "#ffa07a":"Light Salmon",
            "#ffa089":"Vivid Tangerine",
            "#ffa194":"Mona Lisa",
            "#ffa343":"Neon Carrot",
            "#ffa500":"Web Orange",
            "#ffa6c9":"Carnation Pink",
            "#ffa700":"Chrome Yellow",
            "#ffa812":"Dark Tangerine",
            "#ffaa1d":"Bright Yellow",
            "#ffab81":"Hit Pink",
            "#ffae42":"Yellow Orange",
            "#ffb077":"Very Light Tangelo",
            "#ffb0ac":"Cornflower Lilac",
            "#ffb1b3":"Sundown",
            "#ffb300":"UCLA Gold",
            "#ffb31f":"My Sin",
            "#ffb347":"Pastel Orange",
            "#ffb3de":"Light Hot Pink",
            "#ffb555":"Texas Rose",
            "#ffb6c1":"Light Pink",
            "#ffb7c5":"Cherry Blossom Pink",
            "#ffb97b":"Macaroni and Cheese",
            "#ffba00":"Selective Yellow",
            "#ffbcd9":"Cotton Candy",
            "#ffbd5f":"Koromiko",
            "#ffbd88":"Macaroni And Cheese",
            "#ffbf00":"Amber",
            "#ffc0a8":"Wax Flower",
            "#ffc0cb":"Pink",
            "#ffc1cc":"Bubble Gum",
            "#ffc3c0":"Your Pink",
            "#ffc40c":"Mikado Yellow",
            "#ffc87c":"Topaz",
            "#ffc901":"Supernova",
            "#ffcba4":"Peach",
            "#ffcc00":"Tangerine Yellow",
            "#ffcc33":"Sunglow",
            "#ffcc5c":"Golden Tainoi",
            "#ffcc99":"Peach Orange",
            "#ffcd8c":"Chardonnay",
            "#ffcff1":"Shampoo",
            "#ffd2b7":"Romantic",
            "#ffd300":"Cyber Yellow",
            "#ffd38c":"Grandis",
            "#ffd700":"Golden",
            "#ffd800":"School Bus Yellow",
            "#ffd8d9":"Cosmos",
            "#ffdab9":"Peach Puff",
            "#ffdb00":"Sizzling Sunrise",
            "#ffdb58":"Mustard",
            "#ffdcd6":"Peach Schnapps",
            "#ffddaf":"Caramel",
            "#ffddca":"Unbleached Silk",
            "#ffddcd":"Tuft Bush",
            "#ffddcf":"Watusi",
            "#ffddf4":"Pink Lace",
            "#ffdead":"Navajo White",
            "#ffdeb3":"Frangipani",
            "#ffdf00":"Golden Yellow",
            "#ffdf46":"Gargoyle Gas",
            "#ffdfbf":"Very Pale Orange",
            "#ffe135":"Banana Yellow",
            "#ffe1df":"Pippin",
            "#ffe1f2":"Pale Rose",
            "#ffe2c5":"Negroni",
            "#ffe302":"Vivid Yellow",
            "#ffe4b5":"Moccasin",
            "#ffe4c4":"Bisque",
            "#ffe4cd":"Lumber",
            "#ffe4e1":"Misty Rose",
            "#ffe5a0":"Cream Brulee",
            "#ffe6c7":"Tequila",
            "#ffe772":"Kournikova",
            "#ffeac8":"Sandy Beach",
            "#ffead4":"Karry",
            "#ffebcd":"Blanched Almond",
            "#ffec13":"Broom",
            "#ffedbc":"Colonial White",
            "#ffeed8":"Derby",
            "#ffef00":"Canary Yellow",
            "#ffefa1":"Vis Vis",
            "#ffefc1":"Egg White",
            "#ffefd5":"Papaya Whip",
            "#ffefec":"Fair Pink",
            "#fff000":"Yellow Rose",
            "#fff0db":"Peach Cream",
            "#fff0f5":"Lavender Blush",
            "#fff14f":"Gorse",
            "#fff1b5":"Buttermilk",
            "#fff1d8":"Pink Lady",
            "#fff1ee":"Forget Me Not",
            "#fff1f9":"Tutu",
            "#fff39d":"Picasso",
            "#fff3f1":"Chardon",
            "#fff44f":"Lemon Yellow",
            "#fff46e":"Paris Daisy",
            "#fff4ce":"Barley White",
            "#fff4dd":"Egg Sour",
            "#fff4e0":"Sazerac",
            "#fff4e8":"Serenade",
            "#fff4f3":"Chablis",
            "#fff5ee":"Seashell",
            "#fff5f3":"Sauvignon",
            "#fff600":"Cadmium Yellow",
            "#fff6d4":"Milk Punch",
            "#fff6df":"Varden",
            "#fff6f5":"Rose White",
            "#fff700":"Lemon",
            "#fff8d1":"Baja White",
            "#fff8dc":"Cornsilk",
            "#fff8e7":"Cosmic Latte",
            "#fff9e2":"Gin Fizz",
            "#fff9e6":"Early Dawn",
            "#fffacd":"Lemon Chiffon",
            "#fffaf0":"Floral White",
            "#fffaf4":"Bridal Heath",
            "#fffafa":"Snow",
            "#fffbdc":"Scotch Mist",
            "#fffbf9":"Soapstone",
            "#fffc99":"Witch Haze",
            "#fffcea":"Buttery White",
            "#fffcee":"Island Spice",
            "#fffdd0":"Cream",
            "#fffde6":"Chilean Heath",
            "#fffde8":"Travertine",
            "#fffdf3":"Orchid White",
            "#fffdf4":"Quarter Pearl Lusta",
            "#fffee1":"Half and Half",
            "#fffeec":"Apricot White",
            "#fffef0":"Rice Cake",
            "#fffef6":"Black White",
            "#fffefd":"Romance",
            "#ffff00":"Yellow",
            "#ffff31":"Daffodil",
            "#ffff33":"Electric Yellow",
            "#ffff66":"Unmellow Yellow",
            "#ffff99":"Pale Canary",
            "#ffffb4":"Portafino",
            "#ffffbf":"Very Pale Yellow",
            "#ffffe0":"Light Yellow",
            "#fffff0":"Ivory",
            "#ffffff":"White"
        };
        this._copic = ["#ffffff","#312b2b","#030708","#f0f9fe","#e6f4f5","#ddf0f4","#d6eef2","#b3e3f1","#73cfe6","#40c5e6","#00b3e6","#c8e6f0","#71cfeb","#00bcea","#1d8acb","#dbedf9","#92c2e8","#8acef3","#65b3e3","#196db6","#0177c1","#e2eff7","#82c3ed","#156fa4","#2b64a9","#e2f0fb","#75c0ea","#adcddc","#dae1f3","#a7bbe0","#6888c5","#2165ae","#3b479d","#d5e2eb","#95c1da","#60c5cf","#457a9a","#0f547e","#eff8f3","#e5f4ed","#c7e6fa","#c6e8ea","#1db8ce","#1db8ce","#dcf0ef","#dcf0ef","#ceebf1","#c4e7e9","#a0d9d2","#37c0b0","#bde5dd","#bce2d7","#a3dad7","#afdfdf","#00b6b9","#accfd1","#64bebe","#daecee","#74b8bb","#59918e","#49706b","#bac1b9","#bac1b9","#81a291","#6e9b87","#eae7f2","#eae7f2","#e0dced","#c4c9e6","#aab8db","#7c97ce","#eae7f2","#d4d2e8","#8491c8","#6e84bd","#cfdbf1","#b1c0dd","#8184a7","#384558","#eae7f2","#9fa7bc","#e0e7ed","#e0e7ed","#202b31","#dae3e8","#ccd7dd","#c1ccd2","#92a0ab","#92a0ab","#637079","#637079","#535d66","#3c474d","#fffaf4","#fef5ee","#fdf3ea","#ffeee4","#feece0","#e4bcc4","#cc816a","#ca6553","#d96a4f","#fee9d6","#e9c5af","#fbbb8d","#b85f57","#88534d","#c45238","#fde2c7","#eccab1","#d2a482","#997663","#884636","#f7f0d6","#f2e6ce","#f3d2b1","#f0caa6","#e6c3a3","#cc9159","#c5743f","#f2e8dc","#fef1e1","#f3ead9","#e8dabd","#8a6e59","#8a6e59","#634c3c","#f4ebf0","#feecd6","#f1dfb9","#f1dfb9","#b18558","#9a7f6c","#efeae6","#a1847c","#a1847c","#7f604e","#4a2c22","#f0e6c2","#ae9f80","#6f604d","#5a4939","#fed2b9","#fcbc7e","#b46034","#b46034","#f5a3c7","#7f74b6","#fff697","#fecc99","#f1f7f3","#eaf5ed","#e3f2ed","#cfe8d3","#b6da9c","#69c07b","#7bc576","#7ac465","#d2e8c4","#97cf90","#60c198","#14b37d","#2db98a","#edf6db","#c4e4cd","#c3e0b4","#119462","#197c5d","#e4f1df","#d7e7a8","#5.79E+78","#ccdab9","#9dc3aa","#98a786","#5f7e3a","#eceeed","#312f30","#e2e3e5","#dadbdd","#d1d2d4","#bcbdc1","#a8a9ad","#949599","#77787c","#636466","#4c4d4f","#fef3ef","#fef0e7","#feeae1","#fde0d8","#fdd3c7","#f6917b","#f26f39","#f26754","#fde1d5","#fcd3c1","#f59b92","#f4846c","#fcd7cf","#fac1b6","#f8b7b1","#f27579","#f15062","#ed174b","#fce3df","#fac1ba","#f27185","#e86c74","#cb487a","#ee848e","#e04d69","#d27c95","#b74f70","#f1c8d6","#f19cb9","#d36a93","#7d2b42","#f2eaf5","#f4e2ee","#f1daea","#fad5e6","#f6a3bf","#f386af","#fdecf4","#fbd6dd","#f9c9d7","#f495b7","#db7eb3","#d268aa","#fde8e7","#f8bac9","#f493be","#ef4880","#fad3ce","#f9afae","#f8bbb6","#f9cade","#e9a5ca","#d09dae","#b86a84","#8b576e","#b684a1","#5a4858","#eceeed","#322e2d","#eaeae8","#e0e0de","#d1d2cc","#bcbbb9","#a8a7a3","#949590","#777674","#63645f","#4c4b49","#d4e59f","#feecd8","#f0edf6","#e9e5f3","#e4c1d9","#e6aace","#e2a6ca","#ce95c2","#8754a1","#eed7e9","#d3a6cd","#a092c7","#e2e0ed","#b2b1d0","#857fad","#6b668e","#e8c4d0","#e5c1db","#b77ca8","#524358","#f3f3eb","#ecece4","#302f2b","#e7e7df","#ddddd5","#d2d2ca","#bcbdb7","#a8a9a4","#94958f","#777873","#63645f","#4c4d48","#fefef4","#fffce9","#fefddf","#f6f396","#ede556","#fef56c","#fef200","#fffbcc","#fbf7ae","#fee96c","#ffe455","#feed55","#ffe93e","#ffeec2","#fbe3b3","#f0dd67","#caa869","#f9dec0","#ffd879","#ffd274","#f2f7e0","#e6e69e","#e2ebb2","#deeaaa","#d6e592","#c4df92","#a5cf4f","#82c566","#e5f0d0","#72c156","#f7f6be","#e6eb8f","#d0e17b","#d5ebd4","#b4dcb7","#d6e9d6","#a0caa2","#81bf8c","#dad7ae","#d2d29c","#cbc65e","#958f03","#4e6a15","#fff3e5","#fed6bd","#fedac2","#fcdcc5","#fec369","#f26f39","#f15524","#ffe2a6","#fec84e","#fbb884","#feb729","#f26b3c","#ffe1bf","#f5ddb1","#eccf8b","#f0cf64","#fef2da","#ffdea8","#fddac4","#faae60","#f37022","#fdc68d"];
        this._prismacolor = ["E6E8E8","#E9E7DD","#EAE8EA","#D9DDE2","#D4D3C9","#D5D3D5","#C7CED5","#C1BFB8","#C2BBBB","#A7B0B8","#ABA4A1","#A299A1","#7C8C8E","#7B6D62","#6D6262","#2D4A5A","#292726","#554A4A","#4DAD44","#008C9E","#7F7315","#FADDB2","#DDA492","#0000000","#520040","#320341","#3B0A12","#568BD2","#94B2D6","#4575BF","#FFBCB8","#A17315","#9F5215","#E9773D","#FFFF6A","#8BBBE0","#DB3129","#ACBD9D","#005895","#C7D35C","#672F17","#315AC7","#481B0F","#C2A9AE","#C7DDEA","#32358B","#006769","#005B8E","#FFF4C8","#880503","#B42830","#8D007B","#431F16","#00512D","#652B84","#422B20","#FEE3E4","#FFD5E3","#FFF1AB","#004993","#2B1A68","#FFEAC6","#008ACF","#533D2E","#E7CEB1","#E8A42C","#158245","#A08C1C","#CAD9CB","#CFBDDC","#994924","#FF8BBF","#230B65","#000059","#002F50","#74BD9F","#FFDD93","#2F6943","#738C1C","#C39BC8","#FEF769","#68CDC4","#94C7EB","#B2DDA9","#FED9C8","#7F633F","#7A66A8","#C6CD55","#A12049","#8C0821","#676210","#007E9E","#AC8B3C","#E68C3F","#6E6D13","#A9007B","#51B7C3","#E2947B","#FF7716","#FF34C0","#FFFF3B","#00BBD4","#3E5939","#FF6E12","#DDEAC6","#FA6610","#8E69BA","#00B092","#F1A78D","#F8E4D6","#00739A","#004729","#F60000","#50549B","#F3889E","#ECB7C1","#870038","#FF4908","#C3D8EE","#D74893","#DE6619","#DECDC7","#A31719","#D1BDC1","#113B15","#F9AF9C","#FAE0B7","#866210","#78A87C","#D22909","#F4D1C4","#352D14","#9F430A","#A3A1A3","#B1E1F0","#347E8F","#FFC12A","#85CF66","#FFD62F","#A14107","#007EB4","#0BBF7E","#6F2436","#19189E","#44308F","#000092","#FFFFFF","#FFF991","#DAAD41","#FFA723"];
        this._ral = ["#CCC58F","#D1BC8A","#D2B773","#F7BA0B","#E2B007","#C89F04","#E1A100","#E79C00","#AF8A54","#D9C022","#E9E5CE","#DFCEA1","#EADEBD","#EAF044","#F4B752","#F3E03B","#A4957D","#9A9464","#EEC900","#F0CA00","#B89C50","#F5FF00","#A38C15","#FFAB00","#DDB20F","#FAAB21","#EDAB56","#A29985","#927549","#EEA205","#DD7907","#BE4E20","#C63927","#FA842B","#E75B12","#FF2300","#FFA421","#F3752C","#E15501","#D4652F","#EC7C25","#DB6A50","#954527","#AB2524","#A02128","#A1232B","#8D1D2C","#701F29","#5E2028","#402225","#703731","#7E292C","#CB8D73","#9C322E","#D47479","#E1A6AD","#AC4034","#D3545F","#D14152","#C1121C","#D56D56","#F70000","#FF0000","#B42041","#E72512","#AC323B","#711521","#B24C43","#8A5A83","#933D50","#D15B8F","#691639","#83639D","#992572","#4A203B","#904684","#A38995","#C63678","#8773A1","#6B6880","#384C70","#1F4764","#2B2C7C","#2A3756","#1D1F2A","#154889","#41678D","#313C48","#2E5978","#13447C","#232C3F","#3481B8","#232D53","#6C7C98","#2874B2","#0E518D","#21888F","#1A5784","#0B4151","#07737A","#2F2A5A","#4D668E","#6A93B0","#296478","#102C54","#327662","#28713E","#276235","#4B573E","#0E4243","#0F4336","#40433B","#283424","#35382E","#26392F","#3E753B","#68825B","#31403D","#797C5A","#444337","#3D403A","#026A52","#468641","#48A43F","#B7D9B1","#354733","#86A47C","#3E3C32","#008754","#53753C","#005D52","#81C0BB","#2D5546","#007243","#0F8558","#478A84","#7FB0B2","#1B542C","#005D4C","#25E712","#00F700","#7E8B92","#8F999F","#817F68","#7A7B6D","#9EA0A1","#6B716F","#756F61","#746643","#5B6259","#575D57","#555D61","#596163","#555548","#51565C","#373F43","#2E3234","#4B4D46","#818479","#474A50","#374447","#939388","#5D6970","#B9B9A8","#818979","#939176","#CBD0CC","#9A9697","#7C7F7E","#B4B8B0","#6B695F","#9DA3A6","#8F9695","#4E5451","#BDBDB2","#91969A","#82898E","#CFD0CF","#888175","#887142","#9C6B30","#7B5141","#80542F","#8F4E35","#6F4A2F","#6F4F28","#5A3A29","#673831","#49392D","#633A34","#4C2F26","#44322D","#3F3A3A","#211F20","#A65E2F","#79553C","#755C49","#4E3B31","#763C28","#FDF4E3","#E7EBDA","#F4F4F4","#282828","#0A0A0A","#A5A5A5","#8F8F8F","#FFFFFF","#1C1C1C","#F6F6F6","#1E1E1E","#D7D7D7","#9C9C9C","#828282"];
        this._ncs = ["#f7f7f7","#f2f2f2","#f5fbff","#f7fffe","#f4fff8","#fdfff6","#fff1f2","#fef6fd","#fffdf6","#fef8f4","#e8f6fe","#eafbff","#ecfffe","#eafffa","#e4ffef","#ecffec","#f1ffeb","#f4ffea","#f7ffe9","#faffea","#fcffeb","#feffeb","#fffeec","#fefdeb","#ffdee0","#ffdfe3","#ffe1e7","#ffe3ec","#fee6f2","#ffeafb","#f8e9fe","#f0e8ff","#e1e6ff","#e3ecfe","#fffbea","#fffaea","#fff7e9","#fff5e8","#fff3e6","#fff0e5","#feede4","#ffe9e2","#fee5e0","#ffe2e0","#dff3ff","#e3faff","#e2fff8","#dbffe9","#f4ffe0","#fffee4","#ffd2d5","#ffd6de","#ffddee","#f5e0ff","#d6ddff","#fffae3","#fff5e0","#ffeedd","#ffe6da","#fedcd5","#d3eeff","#d6f4ff","#d9fbff","#dafffd","#d8fef9","#d1ffea","#cdffe0","#dbffdc","#e4ffd9","#ebffd6","#f0ffd4","#f5ffd6","#f9ffd8","#fdffd9","#fffdda","#fefbd8","#ffc2c6","#ffc4cb","#ffc7d2","#ffcbdb","#ffd0e7","#ffd7f7","#f1d4ff","#e3d4ff","#c6d1ff","#cbdcff","#fff9d8","#fff5d6","#fff1d4","#ffedd2","#ffe8d0","#ffe3ce","#ffddcc","#fed7c9","#ffd0c6","#ffc9c5","#c0e7ff","#c5f5fe","#c8fffd","#c4fff1","#b8ffd4","#d8ffc8","#eaffc1","#f7fec6","#fffdc8","#fff9c7","#feaaaf","#feadb7","#feb1c0","#ffbcdd","#ebc1ff","#b0befe","#b6ceff","#fff6c6","#fff1c4","#ffebc1","#ffe5bf","#ffdebc","#ffd7b9","#ffcfb6","#ffc6b3","#ffbdaf","#ffb4ae","#aee0ff","#b2ebff","#b6f8ff","#b8fcff","#b8fffc","#b7fff8","#b5fff4","#abffd9","#a5ffc8","#bdffc0","#cdffb9","#daffb4","#e4ffb0","#edffb3","#f4feb5","#fbffb8","#fffcb8","#fff7b6","#ff959c","#ff98a5","#ff9cb0","#ffa2c0","#ffa9d4","#ffb4f0","#e5b0ff","#cbb0ff","#9caeff","#a3c1ff","#fff3b5","#feedb2","#ffe5b0","#ffddad","#ffd5aa","#ffcca7","#ffc2a3","#ffb89f","#ffac9b","#ffa19b","#e09ffe","#c1a0ff","#8ed4ff","#92e3ff","#98f5ff","#9afcff","#9afffb","#98fff5","#96ffef","#8bffcb","#84ffb4","#a3ffa7","#baff9e","#cbff96","#dafe90","#e6ff93","#f0fe96","#f9fe99","#fefb9a","#fef598","#ff737c","#ff7687","#fe7b95","#ff81a9","#fe89c4","#ff95ea","#7a92ff","#81aaff","#ffef96","#fee593","#ffdb90","#ffd08d","#fec589","#feb986","#feac82","#ff9f7e","#ff9079","#ff8279","#72caff","#76dcff","#7cf2ff","#68ffa3","#8eff93","#a9ff86","#bfff7c","#d0ff74","#dfff77","#ecff7a","#f8fe7d","#fffa7e","#fff27c","#ff5863","#ff5b6f","#ff5f7f","#ff6596","#6598ff","#ffeb7a","#ffdf77","#ffd274","#ffc571","#ffb76d","#ffa96a","#fe9a66","#ff8a62","#ff7a5e","#ff695f","#7bff81","#9aff71","#b3ff65","#c8ff5b","#daff5e","#e8ff61","#f7ff64","#fffa65","#ffef62","#ff424e","#ff455b","#ffe761","#ffd95e","#ffca5b","#ffbb58","#ffab55","#ff9b52","#ff8a4e","#fe794b","#ff6747","#ff5549","#6bff71","#8eff5f","#a9ff51","#c0ff45","#d4ff47","#e5ff4a","#f6ff4d","#fff94d","#ffed4b","#ff303e","#fee34a","#ffd347","#ffc345","#ffb242","#ffa140","#fe8f3d","#ff7d3a","#ff6a37","#ff5734","#ff4437","#63ff6a","#d2ff3d","#ff2836","#82ff4f","#a1ff3f","#baff31","#e2ff35","#f4ff37","#fff837","#ffeb36","#ffe035","#ffcf33","#ffbd31","#feaa2f","#fe982d","#ff852b","#ff7128","#ff5e26","#fe4a24","#fe3628","#7dff48","#b7ff28","#e1ff2b","#f4ff2d","#ffea2c","#99ff2e","#ffdd22","#ffca20","#ffca20","#feb71f","#feb71f","#ffa31d","#ff901c","#ff7b1b","#ff6719","#ff5318","#ff3e16","#ff2a1b","#ffb416","#ffa015","#fe8c14","#ff7713","#ff6212","#ff4e11","#ff3910","#f7fcef","#fcfbf0","#fceaed","#fcedf4","#f8effc","#e9edfc","#fcf8ef","#fcf5ed","#fcf1eb","#fcede9","#e8f6f6","#ecf6e7","#f4f6e7","#f6f5e7","#f6dee1","#f6e1e8","#f6e7f3","#ebe5f6","#e1e8f6","#f6f3e6","#f6efe5","#f6ebe3","#f6e6e0","#f6e0de","#d9eff4","#d8f4ee","#e1f4da","#f0f4d9","#f4f1da","#f4cbd0","#f4d0db","#f4d9ef","#e0d6f4","#d0dcf4","#f4edd8","#f4e8d5","#f4e1d2","#f4d8cf","#f4cecc","#e5e5e5","#e8eef1","#e8eef1","#eaf1f1","#e7f1eb","#e7f1eb","#eff1e9","#f1e4e5","#f1e4e5","#f1e9f0","#f1f0e9","#f1ebe7","#dce9f1","#deeef1","#dff1f1","#ddf1ed","#ddf1ed","#d8f1e2","#dff1e0","#e4f1de","#e4f1de","#e7f1dd","#eaf1dc","#edf1dd","#eef1de","#f0f1df","#f1f1df","#f1f1df","#f1efdf","#f1d2d4","#f1d3d7","#f1d5db","#f1d5db","#f1d7e0","#f1dae6","#f1deed","#eadcf1","#e3dcf1","#d5daf1","#d7e0f1","#f1eede","#f1ecdd","#f1eadc","#f1eadc","#f1e8db","#f1e6da","#f1e3d9","#f1e0d8","#f1ddd6","#f1d9d4","#f1d6d4","#c8e2f1","#cae7f1","#cdeef1","#cef1f0","#ccf1ec","#c6f1de","#c2f1d5","#cff1d1","#d8f1cd","#def1cb","#e4f1c9","#e8f1cb","#ecf1cc","#eff1ce","#f1f0ce","#f1eecd","#f1b8bb","#f1bac0","#f1bdc7","#f1c0d0","#f1c5db","#f1ccea","#e4c9f1","#d7c8f1","#bcc6f1","#c1d1f1","#f1eccc","#f1e8cb","#f1e4c9","#f1e0c7","#f1dcc5","#f1d7c3","#f1d1c1","#f1cbbe","#f1c5bc","#f1bebb","#b6dbf1","#bbe8f1","#bef1ef","#baf1e5","#aef1c8","#cdf1be","#def1b7","#eaf1bc","#f1f0be","#f1ecbd","#f1a1a6","#f1a4ad","#f1a7b6","#f1b2d2","#dfb7f1","#a6b4f1","#acc3f1","#f1e9bb","#f1e4b9","#f1dfb7","#f1d9b5","#f1d2b2","#f1cbb0","#f1c4ad","#f1bca9","#f1b3a6","#f1aaa5","#a5d5f1","#a8dff1","#adebf1","#afeff1","#aef1ef","#adf1eb","#abf1e7","#a2f1ce","#9cf1bd","#b3f1b5","#c2f1af","#cef1aa","#d8f1a6","#e1f1a9","#e7f1ac","#eef1ae","#f1efae","#f1eaad","#f18d94","#f1909c","#f194a7","#f19ab5","#f1a1c9","#f1aae4","#d9a7f1","#c1a7f1","#93a5f1","#9ab7f1","#f1e7ab","#f1e0a9","#f1d9a7","#f1d2a4","#f1caa1","#f1c19e","#f1b89a","#f1ae97","#f1a393","#f19892","#86c9f1","#8bd7f1","#90e8f1","#92eef1","#92f1ee","#90f1e8","#8ef1e2","#84f1c0","#7df1aa","#9bf19f","#b0f195","#c1f18e","#cef188","#daf18b","#e3f18e","#ecf191","#f1ee92","#f1e890","#f16d76","#f17080","#f1748d","#f17aa0","#f182b9","#f18dde","#d088f1","#ae8af1","#738bf1","#7aa1f1","#f1e28e","#f1d98b","#f1d088","#f1c585","#f1bb82","#f1af7f","#f1a37b","#f19677","#f18973","#f17b73","#6cbff1","#70d0f1","#73dcf1","#75e5f1","#77eef1","#77f1ed","#75f1e6","#74f1de","#71f1d5","#69f1b4","#63f19a","#86f18b","#a0f17f","#b5f175","#c5f16e","#d4f171","#dff174","#ebf177","#f1ed77","#f1e575","#f1535e","#f15669","#f15a79","#f1608e","#f167ac","#f172d9","#c76ef1","#9e72f1","#5975f1","#6090f1","#f1de74","#f1d371","#f1c76e","#f1bb6b","#f1ae67","#f1a064","#f19260","#f1835d","#f17359","#f1645a","#54b6f1","#58caf1","#5bd8f1","#5de3f1","#5fedf1","#5ff1ec","#5df1e3","#5cf1db","#59f1cf","#52f1aa","#4cf18c","#75f17a","#75f17a","#92f16b","#92f16b","#aaf160","#bdf156","#cef159","#dcf15c","#eaf15f","#f1ed5f","#f1e35d","#f13f4a","#f14157","#f14567","#f1497f","#f150a1","#4a81f1","#f1db5c","#f1cd59","#f1c056","#f1b153","#f1a250","#f1934d","#f1834a","#f17247","#f16143","#f15045","#47f1a5","#40aff1","#39f180","#65f16b","#86f15a","#a0f14c","#b6f141","#c9f144","#d9f146","#e9f149","#f1ec49","#f1e147","#f12e3a","#f13047","#f13259","#f13672","#f1d746","#f1c844","#f1b941","#f1a93f","#f1983c","#f1883a","#f17637","#f16534","#f15331","#f14134","#57f15e","#7bf14b","#98f13b","#b0f12e","#c5f130","#d6f132","#e8f134","#f1eb35","#f1df33","#f11f2d","#f1213a","#f1234c","#f1d432","#f1c430","#f1b32e","#f1a12c","#f1902a","#f17e28","#f16b26","#f15924","#f14622","#f13326","#76f144","#adf126","#c3f127","#d5f129","#e7f12b","#f1eb2b","#f1de2a","#91f12c","#f11322","#f1d220","#f1c01e","#f1ad1d","#f19b1c","#f1881b","#f17519","#f16218","#f14e16","#f13b15","#f1281a","#f1360f","#f12214","#d8d8d8","#dbe1e4","#dde4e3","#dae4de","#e2e4dc","#e4d7d8","#e4dce2","#e4e3dc","#e4deda","#e4e3d3","#e4e2d2","#e4e1d2","#e4dfd1","#e4ddd0","#e4dbcf","#e4d9ce","#e4d7cd","#e4d4cc","#e4d1ca","#e4cdc9","#e4cac8","#bdd5e4","#c1dee4","#c3e4e3","#c0e4dc","#b8e4c9","#cce4c2","#d7e4be","#dfe4c1","#e4e3c3","#e4e0c2","#e4adb1","#e4afb6","#e4b2bc","#e4bacf","#d8bee4","#b2bbe4","#b6c5e4","#e4dec1","#e4dbbf","#e4d8be","#e4d4bc","#e4d0ba","#e4cbb8","#e4c6b6","#e4c0b4","#e4bab1","#e4b4b1","#accfe4","#b1dbe4","#b3e4e2","#afe4d8","#a5e4bd","#c1e4b3","#d1e4ad","#dde4b1","#e4e2b3","#e4dfb2","#e4989d","#e49ba3","#e49eac","#e4a8c6","#d2ade4","#9daae4","#a3b8e4","#e4dcb1","#e4d7af","#e4d2ad","#e4cdab","#e4c7a8","#e4c0a6","#e4b9a3","#e4b1a0","#e4a99d","#e4a19c","#8857e4","#405ee4","#49bce4","#824ee4","#3757e4","#346ee4","#33a1e4","#2de474","#e41931","#e41220","#e43814","#e42518","#cccccc","#cfd3d6","#d0d6d6","#cdd6d1","#d5d6cf","#d6cbcb","#d6cfd5","#d6d5cf","#d6d1cd","#c3cfd6","#c5d3d6","#c5d3d6","#c6d6d6","#c5d6d2","#c5d6d2","#c0d6c9","#c6d6c7","#cbd6c6","#cbd6c6","#ced6c5","#d0d6c4","#d2d6c5","#d4d6c6","#d6d6c6","#d6d6c6","#d6d5c6","#d6bbbc","#d6bcbf","#d6bdc2","#d6bdc2","#d6bfc7","#d6c2cc","#d6c5d3","#d6c5d3","#d0c4d6","#cac3d6","#bdc2d6","#c0c7d6","#d6d4c5","#d6d2c5","#d6d0c4","#d6cfc3","#d6ccc2","#d6cac1","#d6cac1","#d6c7c0","#d6c4be","#d6c1bd","#d6bebc","#b2c9d6","#b4ced6","#b6d3d6","#b7d6d5","#b6d6d1","#b0d6c5","#add6bd","#b8d6b9","#c0d6b7","#c6d6b4","#cad6b3","#ced6b4","#d2d6b6","#d5d6b7","#d6d5b7","#d6d3b6","#d6a3a6","#d6a5ab","#d6a8b1","#d6abb9","#d6afc3","#d6b5d0","#cbb3d6","#bfb2d6","#a7b0d6","#abb9d6","#d6d1b6","#d6ceb4","#d6cbb3","#d6c7b1","#d6c3af","#d6bfae","#d6baac","#d6b5a9","#d6afa7","#d6a9a6","#92bdd6","#96c6d6","#9ad1d6","#9bd5d6","#9bd6d4","#9ad6d1","#98d6cd","#90d6b7","#8bd6a8","#9fd6a1","#add69c","#b7d697","#c0d694","#c8d696","#ced699","#d3d69b","#d6d49b","#d6d09a","#d67e83","#d6808b","#d68494","#d688a1","#d68fb3","#d697ca","#c194d6","#ab94d6","#8392d6","#89a2d6","#d6cd98","#d6c796","#d6c194","#d6bb92","#d6b38f","#d6ac8c","#d6a389","#d69b86","#d69183","#d68882","#77b3d6","#7bbfd6","#80ced6","#82d4d6","#81d6d3","#80d6ce","#7ed6c9","#75d6ab","#6fd697","#8ad68d","#9cd685","#abd67e","#b7d679","#c2d67c","#cad67f","#d2d681","#d6d481","#d6ce80","#d66168","#d66471","#d6677e","#d66c8e","#d673a5","#d67dc5","#b979d6","#9b7bd6","#677bd6","#6d8fd6","#d6c97e","#d6c17c","#d6b979","#d6b076","#d6a674","#d69c70","#d6916d","#d6856a","#d67966","#d66d66","#60aad6","#64b9d6","#66c4d6","#68ccd6","#6ad3d6","#6ad6d3","#68d6cc","#67d6c6","#65d6bd","#5dd6a0","#58d689","#77d67c","#8ed671","#a0d668","#afd661","#bcd664","#c7d667","#d1d66a","#d6d36a","#d6cc68","#d64a53","#d64d5d","#d6506b","#d6557e","#d65c99","#d666c1","#b162d6","#8d65d6","#4f68d6","#5580d6","#d6c667","#d6bc64","#d6b162","#d6a65f","#d69a5c","#d68e59","#d68156","#d67452","#d6664f","#d65950","#4ba2d6","#4fb4d6","#51c0d6","#53cad6","#55d3d6","#55d6d2","#53d6ca","#51d6c3","#4fd6b8","#49d697","#44d67d","#68d66c","#82d660","#97d655","#a8d64d","#b7d64f","#c4d652","#d0d654","#d6d255","#d6ca53","#d63842","#d63a4d","#d63d5c","#d64171","#d6478f","#d650bd","#aa4dd6","#8052d6","#3c59d6","#4172d6","#d6c251","#d6b74f","#d6aa4d","#d69e4a","#d69047","#d68345","#d67442","#d6663f","#d6573c","#d6483e","#45b1d6","#399bd6","#41d6d1","#3ed6c0","#37d68f","#32d672","#5ad65f","#77d650","#8fd644","#a2d63a","#b3d63c","#c1d63e","#cfd640","#d6d241","#d6c83f","#d62934","#d62a3f","#d62d4f","#d63065","#d63586","#7642d6","#2c4cd6","#3067d6","#d6c03e","#d6b23c","#d6a43a","#d69638","#d68835","#d67933","#d66931","#d6592e","#d6492c","#d6392f","#3098d6","#d62649","#2962d6","#4ed654","#6ed643","#87d635","#9dd629","#afd62b","#bed62d","#ced62e","#d6d12f","#d6c62d","#d61c28","#d61d34","#d6bd2c","#d6ae2b","#d69f29","#d68f27","#d68026","#d67024","#d65f22","#d64f20","#d63e1e","#d62d22","#69d63c","#84d62e","#d65b1b","#d64a1a","#bfbfbf","#c2c6c9","#c0c9c4","#c9bebf","#c9c8c2","#43b3c9","#44bcc9","#46c5c9","#44c9bd","#41c9ab","#28c967","#2341c9","#67c93e","#7fc931","#c91a25","#c98725","#c97823","#c96922","#c95920","#c94a1e","#c93a1c","#c92b20","#b2b2b2","#adb9bc","#acbcb8","#b1bcad","#b8bcac","#bcbbae","#bca6aa","#bcacb9","#a5aabc","#bcb6ab","#bcb1a9","#bca9a5","#9cb0bc","#9db4bc","#a0b9bc","#a0bcbb","#9fbcb7","#9abcad","#97bca5","#a1bca2","#a8bca0","#adbc9e","#b1bc9c","#b5bc9e","#b8bc9f","#babca0","#bcbba0","#bcb9a0","#bc8f92","#bc9096","#bc939b","#bc96a2","#bc99aa","#bc9eb6","#b29cbc","#a79cbc","#929abc","#96a2bc","#bcb79f","#bcb59e","#bcb29c","#bcae9b","#bcab9a","#bca798","#bca396","#bc9e94","#bc9992","#bc9491","#80a5bc","#83adbc","#86b7bc","#88babc","#88bcba","#86bcb7","#85bcb3","#7ebca0","#7abc93","#8bbc8d","#97bc88","#a1bc84","#a8bc81","#afbc84","#b4bc86","#b9bc87","#bcba88","#bcb686","#bc6e73","#bc7079","#bc7382","#bc778d","#bc7d9c","#bc84b1","#a982bc","#9682bc","#7380bc","#788ebc","#bcb385","#bcae83","#bca982","#bca37f","#bc9d7d","#bc967b","#bc8f78","#bc8775","#bc7f72","#bc7772","#689cbc","#6ca7bc","#70b4bc","#71b9bc","#71bcb9","#70bcb5","#6ebcb0","#66bc95","#61bc84","#78bc7b","#89bc74","#96bc6e","#a0bc6a","#a9bc6c","#b1bc6f","#b8bc71","#bcb971","#bcb470","#bc555b","#bc5763","#bc5a6e","#bc5f7c","#bc6590","#bc6dad","#a26abc","#876bbc","#5a6cbc","#5f7ebc","#bcb06e","#bca96c","#bca16a","#bc9a68","#bc9165","#bc8862","#bc7f5f","#bc755c","#bc6a59","#bc6059","#5495bc","#57a2bc","#59abbc","#5bb3bc","#5db9bc","#5dbcb8","#5bbcb3","#5abcad","#58bca5","#52bc8c","#4dbc78","#68bc6c","#7dbc63","#8cbc5b","#99bc55","#a5bc58","#aebc5a","#b7bc5c","#bcb95d","#bcb25b","#bc4149","#bc4352","#bc465e","#bc4a6e","#bc5086","#bc59a9","#9b55bc","#7b58bc","#455bbc","#4b70bc","#bcad5a","#bca458","#bc9b55","#bc9153","#bc8750","#bc7c4e","#bc714b","#bc6648","#bc5a45","#bc4d46","#428ebc","#459dbc","#47a8bc","#49b1bc","#4ab8bc","#4abcb8","#49bcb1","#47bcaa","#45bca1","#40bc84","#3bbc6d","#5bbc5f","#72bc54","#84bc4a","#93bc43","#a0bc45","#abbc47","#b6bc4a","#bcb84a","#bcb048","#bc313a","#bc3343","#bc3550","#bc3963","#bc3e7d","#bc46a5","#9543bc","#7048bc","#354ebc","#3964bc","#bcaa47","#bca045","#bc9543","#bc8a41","#bc7e3e","#bc723c","#bc663a","#bc5937","#bc4c34","#bc3f36","#41bcb7","#bc315d","#bc3679","#bc3ea3","#3188bc","#3499bc","#36a5bc","#37afbc","#39b8bc","#36bca8","#30bc7d","#2cbc64","#4fbc53","#68bc46","#7dbc3b","#8ebc33","#9cbc35","#a9bc36","#b5bc38","#bcb739","#bcaf37","#bc232d","#bc2537","#bc2745","#673abc","#2742bc","#2a5abc","#bca836","#bc9c34","#bc9033","#bc8331","#bc772f","#bc692d","#bc5c2b","#bc4e29","#bc4026","#bc3229","#49bc4e","#8bbc2b","#9bbc2d","#a8bc2f","#2456bc","#bc8d2b","#a5a5a5","#a8acae","#a7aeaa","#aea5a5","#aeada9","#3baea4","#39ae94","#8836ae","#29ae5d","#49ae4d","#61ae41","#74ae37","#84ae2f","#91ae31","#9dae33","#a8ae34","#ae212a","#243dae","#2754ae","#ae9c32","#ae852f","#ae7a2d","#ae6e2b","#ae622a","#ae5528","#ae4926","#ae3c24","#ae2f26","#999999","#949fa1","#94a19e","#98a194","#9ea194","#a1a095","#a18e92","#a1949e","#8e91a1","#a19c93","#a19891","#a1918e","#879aa1","#899fa1","#89a1a0","#88a19d","#84a194","#8aa18b","#94a187","#9ba187","#a0a189","#a19e89","#a17c80","#a1808b","#a1889c","#8f86a1","#808ba1","#a19b87","#a19585","#a18f82","#a1887f","#a17f7d","#6e8ea1","#7094a1","#739da1","#74a19f","#72a19a","#6ca189","#68a17e","#77a179","#8aa171","#96a171","#9fa174","#a19c73","#a15e62","#a16068","#a1636f","#a16679","#a16b86","#a17298","#916fa1","#806fa1","#626ea1","#677aa1","#a19a72","#a19571","#a1916f","#a18c6d","#a1876b","#a18169","#a17b67","#a17464","#a16d62","#a16662","#5a86a1","#5c8fa1","#609ba1","#61a19f","#5fa197","#58a180","#53a171","#67a16a","#80a15f","#91a15d","#9ea161","#a19a60","#a1494e","#a14b55","#a14d5e","#a1516b","#a1567c","#a15e94","#8b5ba1","#745ca1","#4d5ca1","#516ca1","#a1975f","#a1915d","#a18a5b","#a18459","#a17c57","#a17554","#a16d52","#a1644f","#a15b4c","#a1524d","#487fa1","#4b8ba1","#4d93a1","#4e99a1","#509ea1","#4fa19e","#4ea199","#4da194","#4ba18e","#46a178","#42a167","#59a15d","#6ba155","#78a14e","#83a149","#8da14b","#95a14d","#9da14f","#a19e50","#a1994e","#a1383e","#a13946","#a13c50","#a1405f","#a14573","#a14c91","#8549a1","#694ca1","#3b4ea1","#4060a1","#a1944d","#a18d4b","#a18549","#a17c47","#a17445","#a16b43","#a16140","#a1573e","#a14d3b","#a1423c","#387aa1","#3b87a1","#3d90a1","#3e98a1","#3f9ea1","#3fa19e","#3ea198","#3da192","#3ca18a","#36a171","#33a15d","#4ea151","#62a148","#71a140","#7ea139","#89a13b","#93a13d","#9ca13f","#a19e3f","#a1973e","#a12a31","#a12b3a","#a12e45","#a13154","#a1356b","#a13c8e","#8039a1","#603ea1","#2d42a1","#3156a1","#a1923d","#a1893b","#a18039","#a17637","#a16c36","#a16233","#a15731","#a14c2f","#a1412d","#a1362e","#3177a1","#389ea1","#5c37a1","#2d5fa1","#a18734","#8c8c8c","#8e9193","#8d9390","#938b8c","#93938f","#336f93","#388493","#398b93","#3a9193","#3a9390","#37937f","#329368","#2e9356","#47934b","#599342","#68933a","#749335","#7e9336","#879338","#8f933a","#583993","#293d93","#2d4f93","#938638","#936c33","#936331","#935a2f","#93502d","#93462b","#933b29","#93312a","#7f7f7f","#7b8486","#7b8684","#7f867c","#83867b","#86867c","#86767a","#867b84","#767986","#86827a","#867e79","#867976","#708186","#728486","#738685","#718683","#6e867b","#738674","#7c8671","#818671","#858672","#868472","#86676b","#866b74","#867182","#776f86","#6b7486","#868171","#867d6f","#86776d","#86716a","#866a68","#5c7686","#5e7c86","#608286","#618685","#5f8680","#5a8672","#578669","#638665","#73865f","#7d865e","#848661","#868260","#864e52","#865057","#86525d","#865565","#865970","#865f7e","#795d86","#6b5d86","#525b86","#556586","#86805f","#867d5e","#86795c","#86755b","#867059","#866b58","#866656","#866154","#865b52","#865551","#4b7086","#4d7786","#508186","#518684","#4f867e","#49866b","#45865f","#568658","#6b864f","#79864d","#838651","#868150","#863c41","#863e47","#86404e","#864459","#864867","#864e7b","#734c86","#614d86","#404d86","#445a86","#867e4f","#86794d","#86734c","#866e4a","#866848","#866146","#865b44","#865342","#864c40","#864440","#3c6a86","#3e7486","#407a86","#418086","#428486","#428684","#418680","#40867c","#3f8676","#3a8664","#378656","#4b864d","#598646","#648641","#6e863d","#76863f","#7c8640","#838642","#868442","#867f41","#862e34","#86303a","#863243","#86354f","#863960","#863f78","#6f3d86","#583f86","#324186","#355086","#867c40","#86753f","#866f3d","#86683b","#866039","#865937","#865135","#864933","#864031","#863732","#377286","#727272","#747779","#747976","#797272","#797875","#366079","#386879","#396e79","#3b7379","#3c7779","#3c7977","#38796a","#34795a","#31794d","#437945","#50793f","#5a793b","#637937","#6a7938","#70793a","#76793b","#4f3979","#304879","#79322d","#666666","#636a6b","#626b69","#656b63","#696b62","#6b6b63","#6b5f61","#6b636a","#5f616b","#6b6862","#6b6560","#6b615e","#5a676b","#5b6a6b","#5c6b6b","#5b6b69","#586b63","#5c6b5d","#636b5a","#676b5a","#6a6b5c","#6b6a5b","#6b5356","#6b565c","#6b5a68","#5f596b","#565d6b","#6b675a","#6b6459","#6b5f57","#6b5a55","#6b5553","#495e6b","#4b636b","#4d686b","#4d6b6a","#4c6b67","#486b5b","#456b54","#4f6b51","#5c6b4c","#646b4b","#6a6b4d","#6b684d","#6b3f42","#6b4045","#6b424a","#6b4451","#6b4759","#6b4c65","#614a6b","#564a6b","#41496b","#44516b","#6b674c","#6b644b","#6b614a","#6b5d49","#6b5a47","#6b5646","#6b5245","#6b4d43","#6b4841","#6b4441","#3c596b","#3e606b","#40676b","#416b6a","#3f6b65","#3a6b55","#376b4c","#456b46","#566b3f","#616b3e","#696b40","#6b6740","#6b3034","#6b3239","#6b343f","#6b3647","#6b3a52","#6b3e63","#5c3d6b","#4d3d6b","#333d6b","#36486b","#6b653f","#6b613e","#6b5c3d","#6b583b","#6b533a","#6b4e38","#6b4836","#6b4335","#6b3d33","#6b3733","#3a6b67","#595959","#5a5d5e","#5a5e5b","#5e5959","#5e5d5b","#385a5e","#395e5d","#3c5e3e","#555e36","#4c4c4c","#4a4f50","#4a504f","#4c504a","#4f504a","#50504a","#504749","#504a4f","#474950","#504e4a","#504c48","#504947","#434d50","#444f50","#455050","#44504f","#42504a","#455046","#4a5044","#4e5044","#505045","#504f44","#503e40","#504045","#50444e","#484350","#404650","#504d44","#504b42","#504841","#50443f","#503f3e","#374750","#384a50","#3a4e50","#3a5050","#39504d","#365045","#34503f","#3c503c","#455039","#4b5038","#4f503a","#504e3a","#502f31","#503034","#503138","#50333c","#503543","#50394c","#483750","#403750","#313750","#333d50","#504d39","#504b38","#504837","#504637","#504336","#504035","#503d33","#503a32","#503631","#503331","#3f3f3f","#414243","#404341","#433f40","#434341","#323232","#313536","#313635","#333632","#353631","#363632","#362f31","#363135","#2f3036","#363431","#363330","#36302f","#2d3336","#2e3536","#2e3635","#2d3634","#2c3631","#2e362e","#31362d","#34362d","#35362e","#36352e","#36292b","#362b2e","#362d34","#302d36","#2b2e36","#36342d","#36322c","#36302b","#362d2a","#362a2a","#262626","#262626","#272828","#272827","#282626","#282827","#252828","#252828","#262825","#282825","#282425","#242428","#282725","#282423"];
    }
    init () {
        this.promise = new Promise ( ( resolve, reject ) => {
            this.promiseResolve = resolve;
            this.promiseReject = reject;
            this.create().then(
                success => {
                    var tools = this.toolbox.querySelectorAll( "li.gn8-colorize-tool" );
                    for ( let index = 0; index < tools.length; index++ ) {
                        tools[index].addEventListener( "click", function (e) {
                            for ( let index = 0; index < tools.length; index++ ) {
                                tools[index].classList.remove( "active" );
                            }
                            e.currentTarget.classList.add( "active" );
                            this[ e.currentTarget.getAttribute( "data-tooltype" ) ]();
                        }.bind( this ) );
                    }
                    var eventlist = [ "change","paste" ];
                    var input = this.toolbox.querySelector( ".gn8-colorize-tool-input > .hex" );
                    for ( let index = 0; index < eventlist.length; index++ ) {
                        input.addEventListener( eventlist[index], function (e) {
                            e.stopPropagation();
                            if ( e.target.value.length < 3 ) {
                                e.target.value = this.hex;
                                return false;
                            }
                            if ( e.target.value.indexOf( "#" ) != 0 ) {
                                e.target.value = "#" + e.target.value;
                            }
                            var rgb = this.hexToRgb(  e.target.value );
                            if ( rgb === false ) {
                                e.target.value = this.hex;
                                return false;
                            }
                            this.rgb = rgb;
                            this.hex = e.target.value;
                            this.createPicker();
                        }.bind( this ) );
                    }
                    this.createPicker();
                    this.toolbox.addEventListener( "click", function (e) {
                        e.stopPropagation();
                    } );
                    this.toolbox.querySelector( ".gn8-colorize-wrap" ).addEventListener( "click", function (e) {
                        e.stopPropagation();
                        this.toolbox.remove();
                        this.promiseResolve( {
                            "hex" : this.hex,
                            "rgb" : this.rgb,
                            "name" : this.name,
                            "theme" : this.theme
                        } );
                    }.bind( this ) );
                },error => {
                    this.promiseReject();
                }
            );
        } );
        return this.promise;
    }
    create () {
        return new Promise( ( resolve, reject ) => {
            var palette = ``;
            var condition = true;
            this.toolbox = document.createElement( "div" );
            this.toolbox.id = `${this.id}-toolbox`;
            this.toolbox.classList.add( "gn8-colorize-toolbox" );
            if ( this.data.palette ) {
                palette = `<li data-tooltype="createPalette" class="gn8-colorize-tool" >Palette</li>`;
            }
            this.toolbox.innerHTML = `
                <div class="gn8-colorize-wrap" ></div>
                <div class="gn8-colorize-tool-wrap" >
                    <ul class="gn8-colorize-tool-list" >
                        <li data-tooltype="createPicker" class="gn8-colorize-tool active" >Picker</li>
                        <li data-tooltype="createRGBA" class="gn8-colorize-tool" >RGB</li>
                        ${palette}
                        <li data-tooltype="createCopic" class="gn8-colorize-tool" >Copic</li>
                        <li data-tooltype="createPrisma" class="gn8-colorize-tool" >Prisma</li>
                        <li data-tooltype="createRal" class="gn8-colorize-tool" >RAL</li>
                        <li data-tooltype="createNcs" class="gn8-colorize-tool">NCS</li>
                    </ul>
                    <div class="gn8-colorize-tool-preview" >
                        <div class="color"></div>
                        <p class="name"></p>
                    </div>
                    <div class="gn8-colorize-tool-input" >
                        <input class="hex">
                        <input class="rgba" readonly>
                    </div>
                    <div class="gn8-colorize-tool-container" ></div>
                </div>
            `;
            this.container.appendChild( this.toolbox );
            while ( condition ) {
                if ( document.getElementById( `${this.id}-toolbox` ) ) condition = false;
            }
            resolve();
        } );
    }
    createPicker () {
        var container = this.toolbox.querySelector( ".gn8-colorize-tool-container" );
        var html = function () {
            return new Promise( ( resolve, reject ) => {
                container.innerHTML = ` <div class="gn8-colorize-picker-area" >
                                            <canvas id="gn8-colorize-picker-canvas" width="310" height="150" ></canvas>
                                            <div class="gn8-colorize-picker-cursor" >
                                                <span style="display: inline;"></span>
                                            </div>
                                        </div>

                                        <div class="gn8-colorize-range-group" data-channel="hue" >
                                            <label>HUE</label>
                                            <div class="gn8-colorize-range hue">
                                                <div class="gn8-colorize-range-track hue" style=""></div>
                                                <div class="gn8-colorize-range-cursor hue" >
                                                    <span style="display: inline;"></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="gn8-colorize-range-group" data-channel="alpha" >
                                            <label>ALPHA</label>
                                            <div class="gn8-colorize-range alpha">
                                                <div class="gn8-colorize-range-track alpha" style=""></div>
                                                <div class="gn8-colorize-range-cursor alpha" >
                                                    <span style="display: inline;"></span>
                                                </div>
                                            </div>
                                        </div>`;
                var c = true;
                while ( c ) {
                    if ( container.querySelectorAll( ".gn8-colorize-range-group" ).length > 0 ) {
                        c = false;
                    }
                }
                resolve();
            } );
        }

        var events = function () {
            try {
                var hueCursor = container.querySelector( ".gn8-colorize-range-cursor.hue" );
                var hueCursorColor = hueCursor.querySelector( "span" );
                var track = hueCursor.parentElement.querySelector( ".gn8-colorize-range-track" );
                var trackMatrix = track.getBoundingClientRect();
                var relativeX = hueCursor.offsetWidth;
                var relativeXColor = hueCursorColor.offsetWidth;
                var min = ( relativeXColor - relativeX ) / 2;
                var max = trackMatrix[ "width" ] - relativeX + ( relativeX - relativeXColor ) / 2;
                hueCursor.addEventListener( "mousedown", function (e) {
                    e.stopPropagation();
                    e.currentTarget.classList.add( "gn8-colorize-is-moving" );
                    e.currentTarget.style.left = parseInt( e.currentTarget.offsetLeft ) + "px";
                } );
                hueCursor.addEventListener( "mousemove", function (e) {
                    e.stopPropagation();
                    if ( !e.currentTarget.classList.contains( "gn8-colorize-is-moving" ) ) return;
                    if (
                        ( e.pageX >= trackMatrix[ "left" ] - 50 && e.pageX <= trackMatrix[ "right" ] + 50 &&
                        e.pageY >= trackMatrix[ "top" ] - 50 && e.pageY <= trackMatrix[ "bottom" ] + 50 ) || true
                    )   {
                        var x = e.pageX - trackMatrix[ "left" ];
                        var xp = Math.max( x - relativeX, min );
                        xp = Math.min( xp, max );
                        hueCursor.style.left = xp + "px";
                        hueCursor.setAttribute(
                            "data-step", parseInt( ( x / trackMatrix[ "width" ] ) * 359 )
                        );
                        update( "cursor" );
                    }else{
                        mouseUp(e);
                    }
                } );
                hueCursor.addEventListener( "mouseup", function (e) {
                    mouseUp(e);
                } );
                track.addEventListener( "click", function (e) {
                    e.stopPropagation();
                    var x = e.pageX - trackMatrix[ "left" ];
                    var xp = Math.max( x - relativeX, min );
                    xp = Math.min( xp, max );
                    hueCursor.style.left = xp + "px";
                    hueCursor.setAttribute(
                        "data-step", parseInt( ( x / trackMatrix[ "width" ] ) * 359 )
                    );
                    update( "cursor" );
                    setTimeout(function() {
                        this.updateName();
                    }.bind( this ), 200);
                }.bind( this ) );
            } catch (error) { console.log(error); }

            try {
                var alphaCursor = container.querySelector( ".gn8-colorize-range-cursor.alpha" );
                var alphaCursorColor = alphaCursor.querySelector( "span" );
                var track = alphaCursor.parentElement.querySelector( ".gn8-colorize-range-track" );
                var trackMatrix = track.getBoundingClientRect();
                var relativeX = alphaCursor.offsetWidth;
                var relativeXColor = alphaCursorColor.offsetWidth;
                var min = ( relativeXColor - relativeX ) / 2;
                var max = trackMatrix[ "width" ] - relativeX + ( relativeX - relativeXColor ) / 2;
                alphaCursor.addEventListener( "mousedown", function (e) {
                    e.stopPropagation();
                    e.currentTarget.classList.add( "gn8-colorize-is-moving" );
                    e.currentTarget.style.left = parseInt( e.currentTarget.offsetLeft ) + "px";
                } );
                alphaCursor.addEventListener( "mousemove", function (e) {
                    e.stopPropagation();
                    if ( !e.currentTarget.classList.contains( "gn8-colorize-is-moving" ) ) return;
                    if (
                        ( e.pageX >= trackMatrix[ "left" ] - 20 && e.pageX <= trackMatrix[ "right" ] + 20 &&
                        e.pageY >= trackMatrix[ "top" ] - 30 && e.pageY <= trackMatrix[ "bottom" ] + 30 ) || true
                    )   {
                        var x = e.pageX - trackMatrix[ "left" ];
                        x = Math.min( trackMatrix[ "width" ], x );
                        x = Math.max( 0, x );
                        var xp = Math.max( x - relativeX, min );
                        xp = Math.min( xp, max );
                        alphaCursor.style.left = xp + "px";
                        alphaCursor.setAttribute(
                            "data-step", ( x / trackMatrix[ "width" ] ).toFixed( 2 )
                        );
                        update( "cursor" );
                    } else {
                        mouseUp(e);
                    }
                } );
                alphaCursor.addEventListener( "mouseup", function (e) {
                    mouseUp(e);
                } );

                track.addEventListener( "click", function (e) {
                    e.stopPropagation();
                    var x = e.pageX - trackMatrix[ "left" ];
                    x = Math.min( trackMatrix[ "width" ], x );
                    x = Math.max( 0, x );
                    var xp = Math.max( x - relativeX, min );
                    xp = Math.min( xp, max );
                    alphaCursor.style.left = xp + "px";
                    alphaCursor.setAttribute(
                        "data-step", ( x / trackMatrix[ "width" ] ).toFixed( 2 )
                    );
                    update( "cursor" );
                    setTimeout(function() {
                        this.updateName();
                    }.bind( this ), 200);
                }.bind( this ) );
            } catch (error) { console.log(error); }

            try {
                var cursor = container.querySelector( ".gn8-colorize-picker-cursor" );
                var track = cursor.parentElement;
                var trackMatrix = track.getBoundingClientRect();
                var canvas = document.getElementById( "gn8-colorize-picker-canvas" );
                var relativeX = cursor.offsetWidth / 2;
                var relativeY = cursor.offsetHeight / 2;
                cursor.addEventListener( "mousedown", function (e) {
                    e.stopPropagation();
                    e.currentTarget.classList.add( "gn8-colorize-is-moving" );
                    e.currentTarget.style.left = parseInt( e.currentTarget.offsetLeft ) + "px";
                    e.currentTarget.style.top = parseInt( e.currentTarget.offsetTop ) + "px";
                } );
                cursor.addEventListener( "mousemove", function (e) {
                    e.stopPropagation();
                    if ( !e.currentTarget.classList.contains( "gn8-colorize-is-moving" ) ) return;
                    var track = e.currentTarget.parentElement;
                    var trackMatrix = track.getBoundingClientRect();
                    if (
                        e.pageX > trackMatrix[ "left" ] && e.pageX < trackMatrix[ "right" ] &&
                        e.pageY > trackMatrix[ "top" ] && e.pageY < trackMatrix[ "bottom" ]
                    )   {
                        var x = e.pageX - trackMatrix[ "left" ];
                        var y = e.pageY - trackMatrix[ "top" ];
                        this.pointerX = x;
                        this.pointerY = y;
                        var left =
                        e.currentTarget.style.left = Math.min( Math.max ( x - relativeX, -4 ), trackMatrix[ "width" ] - ( relativeX * 2 - 4 ) ) + "px";
                        e.currentTarget.style.top = Math.min( Math.max ( y - relativeY, -4 ), trackMatrix[ "height" ] - ( relativeY * 2 - 4 ) ) + "px";
                        update( "cursor" );
                    }else{
                        mouseUp(e);
                    }
                }.bind( this ) );
                cursor.addEventListener( "mouseup", function (e) {
                    mouseUp(e);
                } );

                canvas.addEventListener( "click", function (e) {
                    e.stopPropagation();
                    var canvasMatrix = canvas.getBoundingClientRect();
                    var x = e.pageX - canvasMatrix[ "left" ];
                    var y = e.pageY - canvasMatrix[ "top" ];
                    this.pointerX = x;
                    this.pointerY = y;
                    cursor.style.left = x - relativeX + "px";
                    cursor.style.top = y - relativeY + "px";
                    update( "cursor" );
                    setTimeout(function() {
                        this.updateName();
                    }.bind( this ), 200);
                }.bind( this ) );
            } catch (error) { console.log(error); }
        }.bind( this );

        var mouseUp = function (e) {
            e.stopPropagation();
            e.currentTarget.classList.remove( "gn8-colorize-is-moving" );
            this.updateName();
        }.bind( this );

        var update = function ( source ) {
            var result = /(\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3}.*\d*)\S/g.exec( this.rgb.replace(/\s/g,'') );
            var rgb = {
                "r" : result[1],
                "g" : result[2],
                "b" : result[3],
                "a" : result[4] || 1
            };
            var hueCursor = container.querySelector( ".gn8-colorize-range-cursor.hue" );
            var alphaCursor = container.querySelector( ".gn8-colorize-range-cursor.alpha" );

            if ( source == "cursor" ) {
                var hue = parseInt( hueCursor.getAttribute( "data-step" ) );
                var a = alphaCursor.getAttribute( "data-step" );
                updateHueCursorColor();
                updatePad( hue );
                colorFromPad().then( success => {
                    rgb = {
                        "r" : success[0],
                        "g" : success[1],
                        "b" : success[2],
                        "a" : a || 1
                    };
                    this.rgb = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
                    this.hex = this.rgbToHEX( this.rgb );
                    this.theme = this.inspectTheme();
                    updatePadCursorColor( rgb );
                    updateAlphaCursorColor( this.rgbToHSL( rgb.r, rgb.g, rgb.b ), a );
                    this.updatePreview();
                },error => {} );
            } else {
                this.rgb = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
                this.hex = this.rgbToHEX( this.rgb );
                this.name = this.inspectName();
                this.theme = this.inspectTheme();
                var hsv = this.rgbtoHSV( rgb.r, rgb.g, rgb.b );
                var hue = hsv.h;
                updateAlphaCursor( hue, rgb.a );
                updateAlphaCursorColor( this.rgbToHSL( rgb.r, rgb.g, rgb.b ), a );
                updateHueCursor( hue );
                updatePadCursor( rgb );
                updatePad( hue );
                this.updatePreview();
                this.updateName();
            }
        }.bind( this );

        var colorFromPad = function () {
            return new Promise( ( resolve, reject ) => {
                var canvas = document.getElementById( "gn8-colorize-picker-canvas" );
                var ctx = canvas.getContext("2d");
                resolve( ctx.getImageData( this.pointerX, this.pointerY, 1, 1 ).data );
            } );
        }.bind( this );

        var updatePad = function ( hue ) {
            var canvas = document.getElementById( "gn8-colorize-picker-canvas" );
            var width = canvas.width;
            var height = canvas.height;

            var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.fillRect(0, 0, width, height);

            var grd = ctx.createLinearGradient(0, 0, width, 0);
            grd.addColorStop(0, "rgba(255,255,255,1)");
            grd.addColorStop(0.05, "rgba(255,255,255,1)");
            grd.addColorStop(.95, "rgba(255,255,255,0)");
            grd.addColorStop(1, "rgba(255,255,255,0)");

            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, width, height);

            grd = ctx.createLinearGradient(0, 0, 0, height);
            grd.addColorStop(0, "rgba(0,0,0,0)");
            grd.addColorStop(0.05, "rgba(0,0,0,0)");
            grd.addColorStop(.95, "rgba(0,0,0,1)");
            grd.addColorStop(1, "rgba(0,0,0,1)");

            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, width, height);
        }.bind( this );

        var updatePadCursorColor = function ( rgba ) {
            var hueCursor = container.querySelector( ".gn8-colorize-picker-cursor" );
            var hueCursorColor = hueCursor.querySelector( "span" );
            hueCursorColor.style.backgroundColor = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
        }.bind( this );

        var updatePadCursor = function ( rgba ) {
            var canvas = document.getElementById( "gn8-colorize-picker-canvas" );
            var hueCursor = container.querySelector( ".gn8-colorize-picker-cursor" );
            var hueCursorColor = hueCursor.querySelector( "span" );
            hueCursorColor.style.backgroundColor = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
            var relativeX = hueCursor.offsetWidth / 2;
            var relativeY = hueCursor.offsetHeight / 2;
            var x, y;
            var hsv = this.rgbtoHSV( rgba.r, rgba.g, rgba.b );
            if ( hsv.s <= 1 ) hsv.s *= 100;
            if ( hsv.v <= 1 ) hsv.v *= 100;

            if ( hsv.s / 100 == 1 ) {
                x = canvas.width - ( relativeX * 2 ) + 4 + "px";
            } else if ( hsv.s / 100 == 0 ) {
                x = -4 + "px";
            } else {
                this.pointerX = ( hsv.s / 100 ) * ( canvas.width * .9 );
                x = canvas.width * .05 + this.pointerX - relativeX + "px";
            }

            if ( ( 100 - hsv.v ) / 100 == 1 ) {
                y = canvas.height - ( relativeY * 2 ) + 4 + "px";
            } else if ( ( 100 - hsv.v ) / 100 == 0 ) {
                y = -4 + "px";
            } else {
                this.pointerY = ( 100 - hsv.v ) / 100 * ( canvas.height * .9 );
                y = canvas.height * .05 + this.pointerY - relativeY + "px";
            }

            hueCursor.style.left = `${x}`;
            hueCursor.style.top = `${y}`;
        }.bind( this );

        var updateAlphaCursorColor = function ( hsl, alpha ) {
            alpha = alpha || 1;
            if ( alpha > 1 ) alpha = alpha / 100;
            var h = hsl.h;
            var s = hsl.s + "%";
            var l = hsl.l + "%";
            var alphaCursor = container.querySelector( ".gn8-colorize-range-cursor.alpha" );
            var alphaCursorColor = alphaCursor.querySelector( "span" );
            var alphaTrack = container.querySelector( ".gn8-colorize-range-track.alpha" );
            alphaCursorColor.style.backgroundColor = `hsla(${h},${s},${l},${alpha})`;
            alphaTrack.style.background = `-webkit-linear-gradient(left, hsla(${h},${s},${l},0), hsla(${h},${s},${l},1))`;
            alphaTrack.style.background = `linear-gradient(left, hsla(${h},${s},${l},0), hsla(${h},${s},${l},1))`;
        }

        var updateAlphaCursor = function ( hue, alpha ) {
            alpha = alpha || 1;
            if ( alpha > 1 ) alpha = alpha / 100;
            var alphaTrack = container.querySelector( ".gn8-colorize-range-track.alpha" );
            var alphaCursor = container.querySelector( ".gn8-colorize-range-cursor.alpha" );
            var alphaCursorColor = alphaCursor.querySelector( "span" );
            var relativeX = alphaCursor.offsetWidth;
            var relativeXColor = alphaCursorColor.offsetWidth;
            var min = ( relativeXColor - relativeX ) / 2;
            var max = alphaTrack.offsetWidth - relativeX + ( relativeX - relativeXColor ) / 2;
            var x = alpha * alphaTrack.offsetWidth;
            x = Math.max( x, min );
            x = Math.min( x, max );
            alphaCursorColor.style.backgroundColor = `hsla(${hue},100%,50%,${alpha})`;
            alphaTrack.style.background = `-webkit-linear-gradient(left, hsla(${hue},100%,50%,0), hsla(${hue},100%,50%,1))`;
            alphaTrack.style.background = `linear-gradient(left, hsla(${hue},100%,50%,0), hsla(${hue},100%,50%,1))`;
            alphaCursor.setAttribute( "data-step", alpha );
            alphaCursor.style.left = `${x}px`;
        }

        var updateHueCursorColor = function () {
            var hueCursor = container.querySelector( ".gn8-colorize-range-cursor.hue" );
            var hueCursorColor = hueCursor.querySelector( "span" );
            var hue = parseInt( hueCursor.getAttribute( "data-step" ) );
            hueCursorColor.style.backgroundColor = `hsl(${hue},100%,50%)`;
        }

        var updateHueCursor = function ( hue ) {
            var hueTrack = container.querySelector( ".gn8-colorize-range-track.hue" );
            var hueCursor = container.querySelector( ".gn8-colorize-range-cursor.hue" );
            var hueCursorColor = hueCursor.querySelector( "span" );
            var relativeX = hueCursor.offsetWidth;
            var relativeXColor = hueCursorColor.offsetWidth;
            var min = ( relativeXColor - relativeX ) / 2;
            var max = hueTrack.offsetWidth - relativeX + ( relativeX - relativeXColor ) / 2;
            var x = ( hue / 360 ) * hueTrack.offsetWidth;
            x = Math.max( x, min );
            x = Math.min( x, max );
            hueCursorColor.style.backgroundColor = `hsl(${hue},100%,50%)`;
            hueCursor.setAttribute( "data-step", parseInt( hue ) );
            hueCursor.style.left = `${x}px`;
        }

        html().then(
            success => {
                events();
                update();
            },error => {}
        );
    }
    createRGBA () {
        var container = this.toolbox.querySelector( ".gn8-colorize-tool-container" );
        var html = function () {
            return `<div class="gn8-colorize-range-group" data-channel="red" >
                        <label>Red</label>
                        <div class="gn8-colorize-input-number red">
                            <input type="number" min="0" max="255" >
                        </div>
                        <div class="gn8-colorize-range red">
                            <div class="gn8-colorize-range-track red" style=""></div>
                            <div class="gn8-colorize-range-cursor red" >
                                <span style="display: inline;"></span>
                            </div>
                        </div>
                    </div>

                    <div class="gn8-colorize-range-group" data-channel="green" >
                        <label>GREEN</label>
                        <div class="gn8-colorize-input-number green">
                            <input type="number" min="0" max="255" >
                        </div>
                        <div class="gn8-colorize-range green">
                            <div class="gn8-colorize-range-track green" style=""></div>
                            <div class="gn8-colorize-range-cursor green" >
                                <span style="display: inline;"></span>
                            </div>
                        </div>
                    </div>

                    <div class="gn8-colorize-range-group" data-channel="blue" >
                        <label>BLUE</label>
                        <div class="gn8-colorize-input-number blue">
                            <input type="number" min="0" max="255" >
                        </div>
                        <div class="gn8-colorize-range blue">
                            <div class="gn8-colorize-range-track blue" style=""></div>
                            <div class="gn8-colorize-range-cursor blue" >
                                <span style="display: inline;"></span>
                            </div>
                        </div>
                    </div>

                    <div class="gn8-colorize-range-group" data-channel="alpha" >
                        <label>ALPHA</label>
                        <div class="gn8-colorize-input-number alpha">
                            <input type="number" min="0" max="1" step=".05" >
                        </div>
                        <div class="gn8-colorize-range alpha">
                            <div class="gn8-colorize-range-track alpha" style=""></div>
                            <div class="gn8-colorize-range-cursor alpha" >
                                <span style="display: inline;"></span>
                            </div>
                        </div>
                    </div>`;
        }

        var events = function () {
            try {
                var eventlist = [ "keyup","change","blur","paste" ];
                var colors = [ "red","green","blue","alpha" ];
                colors.forEach( color => {
                    eventlist.forEach( theEvent => {
                        container.querySelector( `.gn8-colorize-input-number.${color} > input` ).addEventListener( theEvent, function () {
                            update( "input" );
                        } );
                    } );
                } );
            } catch (error) {
                console.log( error );
            }
            try {
                var colors = [ "red","green","blue","alpha" ];
                colors.forEach( color => {
                    container.querySelector( `.gn8-colorize-range-cursor.${color}` ).addEventListener( "mousedown", function (e) {
                        e.stopPropagation();
                        e.currentTarget.classList.add( "gn8-colorize-is-moving" );
                        e.currentTarget.style.left = parseInt( e.currentTarget.offsetLeft ) + "px";
                    } );
                    container.querySelector( `.gn8-colorize-range-cursor.${color}` ).addEventListener( "mousemove", function (e) {
                        e.stopPropagation();
                        if ( !e.currentTarget.classList.contains( "gn8-colorize-is-moving" ) ) return;
                        var track = e.currentTarget.parentElement.querySelector( ".gn8-colorize-range-track" );
                        var trackMatrix = track.getBoundingClientRect();
                        var cursor = e.currentTarget;
                        var cursorColor = cursor.querySelector( "span" );
                        var relativeX = cursor.offsetWidth;
                        var relativeXColor = cursorColor.offsetWidth;
                        var min = ( relativeXColor - relativeX ) / 2;
                        var max = trackMatrix[ "width" ] - relativeX + ( relativeX - relativeXColor ) / 2;
                        if (
                            e.pageX >= trackMatrix[ "left" ] - 20 && e.pageX <= trackMatrix[ "right" ] + 20 &&
                            e.pageY >= trackMatrix[ "top" ] - 30 && e.pageY <= trackMatrix[ "bottom" ] + 30
                        )   {
                            var x = e.pageX - trackMatrix[ "left" ];
                            var xp = Math.max( x - relativeX / 2, min );
                            xp = Math.min( xp, max );
                            cursor.style.left = xp + "px";
                            if ( e.currentTarget.classList.contains( "alpha" ) ) {
                                x = Math.min( trackMatrix[ "width" ], x );
                                x = Math.max( 0, x );
                                e.currentTarget.setAttribute(
                                    "data-color-step", (x / trackMatrix[ "width" ]).toFixed( 2 )
                                );
                            }else{
                                x = Math.min( trackMatrix[ "width" ], x );
                                x = Math.max( 0, x );
                                e.currentTarget.setAttribute(
                                    "data-color-step", parseInt( ( x / trackMatrix[ "width" ] ) * 255 )
                                );
                            }
                            update( "cursor" );
                        }else{
                            mouseUp(e);
                        }
                    } );
                    container.querySelector( `.gn8-colorize-range-cursor.${color}` ).addEventListener( "mouseup", function (e) {
                        mouseUp(e);
                    } );
                    container.querySelector( `.gn8-colorize-range-track.${color}` ).addEventListener( "click", function (e) {
                        e.stopPropagation();
                        var track = e.currentTarget;
                        var trackMatrix = track.getBoundingClientRect();
                        var cursor = track.parentElement.querySelector( ".gn8-colorize-range-cursor" );
                        var cursorColor = cursor.querySelector( "span" );
                        var relativeX = cursor.offsetWidth;
                        var relativeXColor = cursorColor.offsetWidth;
                        var min = ( relativeXColor - relativeX ) / 2;
                        var max = trackMatrix[ "width" ] - relativeX + ( relativeX - relativeXColor ) / 2;
                        var x = e.pageX - trackMatrix[ "left" ];
                        var xp = Math.max( x - relativeX / 2, min );
                        xp = Math.min( xp, max );
                        cursor.style.left = xp + "px";
                        if ( cursor.classList.contains( "alpha" ) ) {
                            x = Math.min( trackMatrix[ "width" ], x );
                            x = Math.max( 0, x );
                            cursor.setAttribute(
                                "data-color-step", (x / trackMatrix[ "width" ]).toFixed( 2 )
                            );
                        }else{
                            x = Math.min( trackMatrix[ "width" ], x );
                            x = Math.max( 0, x );
                            cursor.setAttribute(
                                "data-color-step", parseInt( ( x / trackMatrix[ "width" ] ) * 255 )
                            );
                        }
                        update( "cursor" );
                        setTimeout(function() {
                            this.updateName();
                        }.bind( this ), 200);
                    }.bind( this ) );
                } );
            } catch (error) { console.log( error ); }
        }.bind( this );

        var mouseUp = function (e) {
            e.stopPropagation();
            e.currentTarget.classList.remove( "gn8-colorize-is-moving" );
            this.updateName();
        }.bind( this );

        var update = function ( source ) {
            var result = /(\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3}.*\d*)\S/g.exec( this.rgb.replace(/\s/g,'') );
            var rgb = {
                "r" : result[1],
                "g" : result[2],
                "b" : result[3],
                "a" : result[4] || 1
            };
            var groups = container.querySelectorAll( ".gn8-colorize-range-group" );
            groups.forEach( group => {
                if ( source == "input" ) {
                    var value = group.querySelector( "input" ).value || 0;
                    switch ( group.getAttribute( "data-channel" ) ) {
                        case 'red':
                            rgb.r = parseInt( value );
                            break;
                        case 'green':
                            rgb.g = parseInt( value );
                            break;
                        case 'blue':
                            rgb.b = parseInt( value );
                            break
                        case 'alpha':
                            rgb.a = parseFloat( value );
                            break
                    }
                }else if( source == "cursor" ){
                    var value = group.querySelector( ".gn8-colorize-range-cursor" ).getAttribute("data-color-step") || 0;
                    switch ( group.getAttribute( "data-channel" ) ) {
                        case 'red':
                            rgb.r = parseInt( value );
                            break;
                        case 'green':
                            rgb.g = parseInt( value );
                            break;
                        case 'blue':
                            rgb.b = parseInt( value );
                            break
                        case 'alpha':
                            rgb.a = parseFloat( value );
                            break
                    }
                }else{
                    switch ( group.getAttribute( "data-channel" ) ) {
                        case 'red':
                            group.querySelector( "input" ).value = rgb.r;
                            break;
                        case 'green':
                            group.querySelector( "input" ).value = rgb.g;
                            break;
                        case 'blue':
                            group.querySelector( "input" ).value = rgb.b;
                            break
                        case 'alpha':
                            group.querySelector( "input" ).value = rgb.a;
                            break
                    }
                }
            } );
            this.rgb = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
            this.hex = this.rgbToHEX( this.rgb );
            this.theme = this.inspectTheme();
            if ( source == "input" ) {
                updateTracks();
            } else if( source == "cursor" ) {
                updateInputs();
                updateTracksColors();
            } else {
                updateTracks();
                this.updateName();
            }
            this.updatePreview();
        }.bind( this );

        var updateTracksColors = function () {
            var result = /(\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3}.*\d*)\S/g.exec( this.rgb.replace(/\s/g,'') );
            var rgba = {
                "r" : result[1],
                "g" : result[2],
                "b" : result[3],
                "a" : result[4] || 1
            };
            var container = this.toolbox.querySelector( ".gn8-colorize-tool-container" );
            var groups = container.querySelectorAll( ".gn8-colorize-range-group" );
            groups.forEach( group => {
                var track = group.querySelector( ".gn8-colorize-range-track" );
                var cursor = group.querySelector( ".gn8-colorize-range-cursor" );
                var cursorColor = cursor.querySelector( "span" );
                cursorColor.style.backgroundColor = this.rgb;
                switch ( group.getAttribute( "data-channel" ) ) {
                    case 'red':
                        track.style.background = `-webkit-linear-gradient(left, rgb(0,${rgba.g},${rgba.b}), rgb(128,${rgba.g},${rgba.b}), rgb(255,${rgba.g},${rgba.b}))`;
                        track.style.background = `linear-gradient(left, rgb(0,${rgba.g},${rgba.b}), rgb(128,${rgba.g},${rgba.b}), rgb(255,${rgba.g},${rgba.b}))`;
                        cursor.setAttribute( "data-color-step", rgba.r );
                        break;
                    case 'green':
                        track.style.background = `-webkit-linear-gradient(left, rgb(${rgba.r},0,${rgba.b}), rgb(${rgba.r},128,${rgba.b}), rgb(${rgba.r},255,${rgba.b}))`;
                        track.style.background = `linear-gradient(left, rgb(${rgba.r},0,${rgba.b}), rgb(${rgba.r},128,${rgba.b}), rgb(${rgba.r},255,${rgba.b}))`;
                        cursor.setAttribute( "data-color-step", rgba.g );
                        break;
                    case 'blue':
                        track.style.background = `-webkit-linear-gradient(left, rgb(${rgba.r},${rgba.g},0), rgb(${rgba.r},${rgba.g},128), rgb(${rgba.r},${rgba.g},255))`;
                        track.style.background = `linear-gradient(left, rgb(${rgba.r},${rgba.g},0), rgb(${rgba.r},${rgba.g},128), rgb(${rgba.r},${rgba.g},255))`;
                        cursor.setAttribute( "data-color-step", rgba.b );
                        break
                    case 'alpha':
                        track.style.background = `-webkit-linear-gradient(left, rgb(${rgba.r},${rgba.g},${rgba.b},0), rgb(${rgba.r},${rgba.g},${rgba.b},.5), rgb(${rgba.r},${rgba.g},${rgba.b},1))`;
                        track.style.background = `linear-gradient(left, rgb(${rgba.r},${rgba.g},${rgba.b},0), rgb(${rgba.r},${rgba.g},${rgba.b},.5), rgb(${rgba.r},${rgba.g},${rgba.b},1))`;
                        cursor.setAttribute( "data-color-step", rgba.a );
                        break
                }
            } );
        }.bind( this );

        var updateTracks = function () {
            var result = /(\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3}.*\d*)\S/g.exec( this.rgb.replace(/\s/g,'') );
            var rgba = {
                "r" : result[1],
                "g" : result[2],
                "b" : result[3],
                "a" : result[4] || 1
            };
            var container = this.toolbox.querySelector( ".gn8-colorize-tool-container" );
            var groups = container.querySelectorAll( ".gn8-colorize-range-group" );
            groups.forEach( group => {
                var track = group.querySelector( ".gn8-colorize-range-track" );
                var cursor = group.querySelector( ".gn8-colorize-range-cursor" );
                var cursorColor = cursor.querySelector( "span" );
                var trackMatrix = track.getBoundingClientRect();
                var relativeX = cursor.offsetWidth;
                var relativeXColor = cursorColor.offsetWidth;
                var min = ( relativeXColor - relativeX ) / 2;
                var max = trackMatrix[ "width" ] - relativeX + ( relativeX - relativeXColor ) / 2;
                cursorColor.style.backgroundColor = this.rgb;
                switch ( group.getAttribute( "data-channel" ) ) {
                    case 'red':
                        track.style.background = `-webkit-linear-gradient(left, rgb(0,${rgba.g},${rgba.b}), rgb(128,${rgba.g},${rgba.b}), rgb(255,${rgba.g},${rgba.b}))`;
                        track.style.background = `linear-gradient(left, rgb(0,${rgba.g},${rgba.b}), rgb(128,${rgba.g},${rgba.b}), rgb(255,${rgba.g},${rgba.b}))`;
                        var x = parseInt( ( parseInt( rgba.r ) / 255 ) * trackMatrix[ "width" ] );
                        var xp = Math.max( x - relativeX + relativeXColor / 2 , min );
                        xp = Math.min( xp, max );
                        cursor.style.left = xp + "px";
                        cursor.setAttribute( "data-color-step", rgba.r );
                        break;
                    case 'green':
                        track.style.background = `-webkit-linear-gradient(left, rgb(${rgba.r},0,${rgba.b}), rgb(${rgba.r},128,${rgba.b}), rgb(${rgba.r},255,${rgba.b}))`;
                        track.style.background = `linear-gradient(left, rgb(${rgba.r},0,${rgba.b}), rgb(${rgba.r},128,${rgba.b}), rgb(${rgba.r},255,${rgba.b}))`;
                        var x = parseInt( ( parseInt( rgba.g ) / 255 ) * trackMatrix[ "width" ] );
                        var xp = Math.max( x - relativeX + relativeXColor / 2, min );
                        xp = Math.min( xp, max );
                        cursor.style.left = xp + "px";
                        cursor.setAttribute( "data-color-step", rgba.g );
                        break;
                    case 'blue':
                        track.style.background = `-webkit-linear-gradient(left, rgb(${rgba.r},${rgba.g},0), rgb(${rgba.r},${rgba.g},128), rgb(${rgba.r},${rgba.g},255))`;
                        track.style.background = `linear-gradient(left, rgb(${rgba.r},${rgba.g},0), rgb(${rgba.r},${rgba.g},128), rgb(${rgba.r},${rgba.g},255))`;
                        var x = parseInt( ( parseInt( rgba.b ) / 255 ) * trackMatrix[ "width" ] );
                        var xp = Math.max( x - relativeX + relativeXColor / 2, min );
                        xp = Math.min( xp, max );
                        cursor.style.left = xp + "px";
                        cursor.setAttribute( "data-color-step", rgba.b );
                        break
                    case 'alpha':
                        track.style.background = `-webkit-linear-gradient(left, rgb(${rgba.r},${rgba.g},${rgba.b},0), rgb(${rgba.r},${rgba.g},${rgba.b},.5), rgb(${rgba.r},${rgba.g},${rgba.b},1))`;
                        track.style.background = `linear-gradient(left, rgb(${rgba.r},${rgba.g},${rgba.b},0), rgb(${rgba.r},${rgba.g},${rgba.b},.5), rgb(${rgba.r},${rgba.g},${rgba.b},1))`;
                        var x = parseInt( rgba.a * trackMatrix[ "width" ] );
                        var xp = Math.max( x - relativeX + relativeXColor / 2, min );
                        xp = Math.min( xp, max );
                        cursor.style.left = xp + "px";
                        cursor.setAttribute( "data-color-step", rgba.a );
                        break
                }
            } );
        }.bind( this );

        var updateInputs = function () {
            var result = /(\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3}.*\d*)\S/g.exec( this.rgb.replace(/\s/g,'') );
            var rgba = {
                "r" : result[1],
                "g" : result[2],
                "b" : result[3],
                "a" : result[4] || 1
            };
            var container = this.toolbox.querySelector( ".gn8-colorize-tool-container" );
            var groups = container.querySelectorAll( ".gn8-colorize-range-group" );
            groups.forEach( group => {
                switch ( group.getAttribute( "data-channel" ) ) {
                    case 'red':
                        group.querySelector( "input" ).value = rgba.r;
                        break;
                    case 'green':
                        group.querySelector( "input" ).value = rgba.g;
                        break;
                    case 'blue':
                        group.querySelector( "input" ).value = rgba.b;
                        break
                    case 'alpha':
                        group.querySelector( "input" ).value = rgba.a;
                        break
                }
            } );
        }.bind( this );

        container.innerHTML = html();
        events();
        update();
    }
    createPalette () {
        try {
            var palette = this.data.palette;
            var container = this.toolbox.querySelector( ".gn8-colorize-tool-container" );
            container.innerHTML = "";
            container.appendChild( this.createChart( palette ) );
            container.addEventListener( "click", function (e) {
                if ( e.target.classList.contains( "gn8-colorize-a-color" ) ) {
                    this.hex = e.target.getAttribute( "data-hex" );
                    this.rgb = this.hexToRgb( this.hex );
                    this.name = this.inspectName();
                    this.theme = this.inspectTheme();
                    this.updatePreview();
                    this.updateName();
                }
            }.bind( this ) );
        } catch (error) {
            reject();
        }
    }
    createCopic () {
        try {
            var palette = this._copic;
            var container = this.toolbox.querySelector( ".gn8-colorize-tool-container" );
            container.innerHTML = "";
            container.appendChild( this.createChart( palette ) );
            container.addEventListener( "click", function (e) {
                if ( e.target.classList.contains( "gn8-colorize-a-color" ) ) {
                    this.hex = e.target.getAttribute( "data-hex" );
                    this.rgb = this.hexToRgb( this.hex );
                    this.name = this.inspectName();
                    this.theme = this.inspectTheme();
                    this.updatePreview();
                    this.updateName();
                }
            }.bind( this ) );
        } catch (error) {}
    }
    createPrisma () {
        try {
            var palette = this._prismacolor;
            var container = this.toolbox.querySelector( ".gn8-colorize-tool-container" );
            container.innerHTML = "";
            container.appendChild( this.createChart( palette ) );
            container.addEventListener( "click", function (e) {
                if ( e.target.classList.contains( "gn8-colorize-a-color" ) ) {
                    this.hex = e.target.getAttribute( "data-hex" );
                    this.rgb = this.hexToRgb( this.hex );
                    this.name = this.inspectName();
                    this.theme = this.inspectTheme();
                    this.updatePreview();
                    this.updateName();
                }
            }.bind( this ) );
        } catch (error) {}
    }
    createRal () {
        try {
            var palette = this._ral;
            var container = this.toolbox.querySelector( ".gn8-colorize-tool-container" );
            container.innerHTML = "";
            container.appendChild( this.createChart( palette ) );
            container.addEventListener( "click", function (e) {
                if ( e.target.classList.contains( "gn8-colorize-a-color" ) ) {
                    this.hex = e.target.getAttribute( "data-hex" );
                    this.rgb = this.hexToRgb( this.hex );
                    this.name = this.inspectName();
                    this.theme = this.inspectTheme();
                    this.updatePreview();
                    this.updateName();
                }
            }.bind( this ) );
        } catch (error) {}
    }
    createNcs () {
        try {
            var palette = this._ncs;
            var container = this.toolbox.querySelector( ".gn8-colorize-tool-container" );
            container.innerHTML = "";
            container.appendChild( this.createChart( palette ) );
            container.addEventListener( "click", function (e) {
                if ( e.target.classList.contains( "gn8-colorize-a-color" ) ) {
                    this.hex = e.target.getAttribute( "data-hex" );
                    this.rgb = this.hexToRgb( this.hex );
                    this.name = this.inspectName();
                    this.theme = this.inspectTheme();
                    this.updatePreview();
                    this.updateName();
                }
            }.bind( this ) );
        } catch (error) {}
    }
    createChart ( list ) {
        var chart = document.createElement( "div" );
        chart.classList.add( "gn8-colorize-chart" );
        list.forEach( color => {
            var c = document.createElement( "div" );
            c.classList.add( "gn8-colorize-a-color" );
            c.setAttribute( "data-hex", color );
            c.style.backgroundColor = color;
            if ( this.hex.toUpperCase() == color.toUpperCase() ) {
                c.classList.add( "selected" );
            }
            chart.appendChild( c );
        } );
        return chart;
    }
    inspectName () {
        if ( !this.hex ) return "";
        try {
            if ( this._names.hasOwnProperty( this.hex ) ) return this._names[ this.hex ];
            var keys = Object.keys( this._names );
            var a = this.hexToRgbArray( this.hex );
            var diffs = [];
            for (let index = 0; index < keys.length; index++) {
                var b = this.hexToRgbArray( keys[ index ] );
                diffs.push( [ keys[ index ], Math.sqrt(Math.pow((a.r - b.r),2) + Math.pow((a.g - b.g),2) + Math.pow((a.b - b.b),2)) ] );
            }
            diffs.sort(function(a, b) {
                return a[1] - b[1];
            });
            return `~${this._names[ diffs[0][0] ]}`;
        } catch (error) { return ""; }
    }
    inspectTheme () {
        if ( !this.rgb ) return "light";
        var rgb = this.rgb.replace(/\s/g,'');
        var result = /(\d{1,3}),(\d{1,3}),(\d{1,3})\S/g.exec( rgb );
        //http://www.w3.org/TR/AERT#color-contrast
        var lightness = Math.round(
            (
                ( parseInt(result[1]) * 299 ) + ( parseInt(result[2]) * 587 ) + ( parseInt(result[3]) * 114 )
            ) /1000
        );
        if( lightness > 125 ) return "light";
        return "dark";
    }
    hexToRgb ( hex ) {
        var hex = hex.replace(/\s/g,'');
        try {
            var short = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            var hex = hex.replace( short, function(r, g, b, a) {
                return r + r + g + g + b + b;
            } );
        } catch (error) {}
        try {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
            return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},1)`;
        } catch (error) { return false;}
    }
    hexToRgbArray ( hex ) {
        var hex = hex.replace(/\s/g,'');
        try {
            var short = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            var hex = hex.replace( short, function(r, g, b, a) {
                return r + r + g + g + b + b;
            } );
        } catch (error) {}
        try {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
            return {
                "r" : parseInt(result[1], 16),
                "g" : parseInt(result[2], 16),
                "b" : parseInt(result[3], 16),
                "a" : 1
            }
        } catch (error) {
            return false;
        }
    }
    rgbToHEX ( rgb ) {
        var rgb = rgb.replace(/\s/g,'');
        var result = /(\d{1,3}),(\d{1,3}),(\d{1,3})\S/g.exec( rgb );
        var r = parseInt(result[1]).toString(16);
        if ( r.length < 2 ) r = "0" + r;
        var g = parseInt(result[2]).toString(16);
        if ( g.length < 2 ) g = "0" + g;
        var b = parseInt(result[3]).toString(16);
        if ( b.length < 2 ) b = "0" + b;
        return "#" + r + g + b;
    }
    hslToRGB ( h,s,l ) {
        var a = s * Math.min( l, 1-l );
        var f = ( n, k = ( n + h / 30 ) % 12 ) => l - a * Math.max( Math.min( k-3, 9-k, 1 ), -1 );
        return [f(0),f(8),f(4)];
    }
    rgbToHSL (r,g,b) {
        r /= 255;
        g /= 255;
        b /= 255;
        var cmin = Math.min(r,g,b);
        var cmax = Math.max(r,g,b);
        var delta = cmax - cmin;
        var h = 0;
        var s = 0;
        var l = 0;

        if (delta == 0){
            h = 0;
        }else if (cmax == r){
            h = ((g - b) / delta) % 6;
        }else if (cmax == g){
            h = (b - r) / delta + 2;
        }else{
            h = (r - g) / delta + 4;
        }

        h = Math.round(h * 60);
        if (h < 0) h += 360;

        l = (cmax + cmin) / 2;
        if ( delta == 0 ) {
            s = 0;
        }else{
            s = delta / (1 - Math.abs(2 * l - 1));
        }
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return {
            "h" : h,
            "s" : s,
            "l" : l
        }
    }
    hwbtoRGB( h, w, b ) {
        var r, g, b, i, f, p, q, t;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = b * (1 - w);
        q = b * (1 - f * w);
        t = b * (1 - (1 - f) * w);
        switch (i % 6) {
            case 0: r = b, g = t, b = p; break;
            case 1: r = q, g = b, b = p; break;
            case 2: r = p, g = b, b = t; break;
            case 3: r = p, g = q, b = b; break;
            case 4: r = t, g = p, b = b; break;
            case 5: r = b, g = p, b = q; break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }
    rgbtoHSV( r, g, b ) {
        let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
        rabs = parseInt( r ) / 255;
        gabs = parseInt( g ) / 255;
        babs = parseInt( b ) / 255;
        v = Math.max(rabs, gabs, babs),
        diff = v - Math.min(rabs, gabs, babs);
        diffc = c => (v - c) / 6 / diff + 1 / 2;
        percentRoundFn = num => Math.round(num * 100) / 100;
        if (diff == 0) {
            h = s = 0;
        } else {
            s = diff / v;
            rr = diffc(rabs);
            gg = diffc(gabs);
            bb = diffc(babs);

            if (rabs === v) {
                h = bb - gg;
            } else if (gabs === v) {
                h = (1 / 3) + rr - bb;
            } else if (babs === v) {
                h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
                h += 1;
            }else if (h > 1) {
                h -= 1;
            }
        }
        return {
            h: Math.round(h * 360),
            s: percentRoundFn(s * 100),
            v: percentRoundFn(v * 100)
        };
    }
    updatePreview () {
        if ( !this.timer || this.timer < Date.now() - 50 ) {
            var preview = this.toolbox.querySelector( ".gn8-colorize-tool-preview" );
            var inputs = this.toolbox.querySelector( ".gn8-colorize-tool-input" );
            var previewColor = preview.querySelector( ".color" );
            previewColor.style.backgroundColor = this.rgb;
            preview.style.color = "black";
            if ( this.theme == "dark" ) preview.style.color = "white";
            inputs.querySelector( ".hex" ).value = this.hex;
            inputs.querySelector( ".rgba" ).value = this.rgb;
            this.timer = Date.now();
        }
    }
    updateName () {
        this.name = this.inspectName();
        this.toolbox.querySelector( ".gn8-colorize-tool-preview .name" ).innerText = this.name;
    }
    idFunction( l ){
        if( !l ){
            l = 31;
        }else{
            l = parseInt(l) - 1;
        }
        var r = "";
        var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
        var f = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < l; i++){
            r += p.charAt(Math.floor(Math.random() * p.length));
        }
        r = f.charAt(Math.floor(Math.random() * f.length)) + r;
        return r;
    }
}
