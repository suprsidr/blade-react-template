const commonSpecs = [
  {
    name: 'Length',
    value: '200mm'
  },
  {
    name: 'Width',
    value: '220mm'
  },
  {
    name: 'Height',
    value: '45mm (65mm with camera)'
  },
  {
    name: 'Weight',
    value: '107g (122g with HD camera)'
  },
  {
    name: 'Battery',
    value: '750mAh 1S Li-Po (included)'
  },
  {
    name: 'Charger',
    value: '1S USB Li-Po charger (included)'
  },
  {
    name: 'Flight Time',
    value: '8-10 minutes'
  },
  {
    name: 'Recommended Environment',
    value: 'Indoor/Outdoor'
  },
  {
    name: 'Assembly Required?',
    value: 'No'
  },
  {
    name: 'Experience Level',
    value: 'Beginner'
  }
];
const InitialState = {
  prodInfo: {
    prodName: 'Zeyrok',
    prodId: 'BLH7300'
  },
  hero: {
    img: 'img/header.jpg',
    alt: 'Blade Zeyrok'
  },
  introText: {
    heading: 'Zeyrok™ Drone',
    text: 'A Versatile Drone the Beginner Pilot Can\'t Beat',
    videoId: 'tNLT6ZNqjMI'
  },
  safeTech: {
    heading: '<strong>Engineered With</strong> SAFE&trade; Technology',
    text: 'The Blade® Zeyrok™ drone features exclusive SAFE (Sensor Assisted Flight Envelope) technology—a revolutionary electronic flight envelope protection system that\'s custom tuned with intuitive flight modes that help anyone fly with confidence.'
  },
  dividerImages: [
    'img/divider-1.jpg',
    'img/divider-2.jpg',
    'img/divider-3.jpg',
    'img/divider-4.jpg'
  ],
  modes: [
    {
      heading: 'Stability mode',
      text: 'Pitch and roll limits are locked to offer a limited flight envelope while electronic self-leveling offers positive stability the instant you release the sticks.'
    },
    {
      heading: 'Stagility™ mode',
      text: 'Self-leveling and flight envelope limits are maintained. You can flip 360° by moving control stick to full in any direction.'
    },
    {
      heading: 'Agility mode',
      text: 'A high performance flight experience that features unlimited maneuverability and the control to explore aerobatic flight.'
    }
  ],
  features: [
    {
      heading: 'HD Camera',
      text: 'You can get the Zeyrok with a lightweight 720p/1.3 MP camera, or add it later. The HD camera is built into a removable pod that features protective landing skids. Activation of the video and still camera functions is controlled from your transmitter. A removable 4GB Micro SD memory card comes installed to get you started.',
      img: 'img/feature-1.jpg'
    },
    {
      heading: 'Durable Design',
      text: 'Industrial engineered, the plastic airframe provides a level of durability that allows this machine to withstand a remarkable amount of abuse.',
      img: 'img/feature-2.jpg'
    },
    {
      heading: 'LED Lights',
      text: 'Brilliant front and rear LED lights provide orientation recognition. Illumination changes indicate camera operation and a low-battery status.',
      img: 'img/feature-3.jpg'
    },
    {
      heading: 'Removable Landing Gear',
      text: 'You can get the Zeyrok drone with the removable landing gear and HD camera, or upgrade the RTF and BNF versions with replacement part (BLH7309).',
      img: 'img/feature-4.jpg'
    },
    {
      heading: 'Low Maintenance',
      text: 'The streamlined power system features durable carbon-fiber motor shafts driven by a concealed motor and gearbox that protects the system from dirt and debris.',
      img: 'img/feature-5.jpg'
    },
    {
      heading: 'Long Flight Times',
      text: 'The 750mAh 1S Li-Po flight battery can provide flight times of up to 10-minutes. Its high capacity allows it to run the flight system and optional remote controlled HD camera.',
      img: 'img/feature-6.jpg'
    },
    {
      heading: 'Bind-N-Fly® Convenience',
      text: 'Besides the RTF versions with or without the HD camera, there\'s a Bind-N-Fly® version that will work great with a long list of available 5+ channel multi-function transmitters equipped with DSM2®/DSMX®.',
      img: 'img/feature-7.jpg'
    }
  ],
  prices: [
    {
      className: ['', 'text-price'],
      price: '119.99',
      completion: 'Ready-to-Fly',
      prodId: 'BLH7300',
      neededToComplete: [
        'Compatible DSMX® transmitter and 4AA batteries included',
        'Lithium polymer (Li-Po) flight battery and charger included'
      ],
      specs: commonSpecs,
      url: 'http://www.horizonhobby.com/zeyrok-rtf-yellow-blh7300t1'
    },
    {
      className: ['best-plan', 'text-price'],
      price: '159.99',
      completion: 'Ready-to-Fly with Camera Version',
      prodId: 'BLH7360',
      neededToComplete: [
        'Remote control 720p/1.3MP camera with 4GB Micro SD card included',
        'Compatible DSMX® transmitter and 4AA batteries included',
        'Lithium polymer (Li-Po) flight battery and charger included'
      ],
      specs: commonSpecs,
      url: 'http://www.horizonhobby.com/zeyrok-rtf-with-camera-yellow-blh7360t1'
    },
    {
      className: ['', 'text-price-grey'],
      price: '89.99',
      completion: 'Bind-n-Fly',
      prodId: 'BLH7380',
      neededToComplete: [
        'Lithium polymer (Li-Po) flight battery and charger included'
      ],
      specs: commonSpecs,
      url: 'http://www.horizonhobby.com/zeyrok-bnf-yellow-blh7380t1'
    }
  ]
};

export default InitialState;
