const PLACEHOLDER_PREFIX = ['TO', 'CONFIRM:'].join(' ');
export const isPlaceholder = (val: unknown): boolean =>
  typeof val === 'string' && val.startsWith(PLACEHOLDER_PREFIX);

export const siteConfig = {
  name: "New Durga Wire Netting Work",
  established: 2010,
  tagline: "Precision manufacturer of railway signal relay assemblies, relay child parts and coach fan guards in Pithampur, Madhya Pradesh.",
  domain: "https://newdurgawirenettingworks.in",
  siteUrl: "https://newdurgawirenettingworks.in",
  gst: "23ADHPJ0963BIZ3",
  address: {
    line1: "Sector 59-A, Industrial Area",
    city: "Pithampur",
    district: "Dist. Dhar",
    state: "Madhya Pradesh",
    pincode: "454775",
    full: "Sector 59-A, Industrial Area, Pithampur, Dist. Dhar, Madhya Pradesh 454775",
    short: "Pithampur, Dist. Dhar, Madhya Pradesh"
  },
  phones: [
    "+91 96300 89192",
    "+91 93032 75254",
    "+91 94253 52005"
  ],
  emails: [
    "newdurgawire@gmail.com",
    "newdurgawireprem@rediff.com"
  ],
  workingHours: "10:00 AM to 5:00 PM",
  whatsappNumber: "+91 96300 89192",
  googleBusinessUrl: null,
  web3formsKey: "4240c512-9e09-4b3e-9a94-ff33c83e5848",
  legalName: "New Durga Wire Netting Works",
  addressConfirmation: "Sector 59-A, Industrial Area, Pithampur, Dist. Dhar, Madhya Pradesh 454775",

  flags: {
    SHOW_ANNUAL_SALES: true,
    SHOW_REFERENCES_LINE: false
  },

  annualSalesText: "Average annual sales of approximately Rs 7 to 8 crore.",

  iso: {
    standard: "ISO 9001:2015, Quality Management System",
    body: "Benchmark Veritas Quality Institute",
    certificateNumber: "BVQMLA163895081626",
    issueDate: "17 August 2026",
    expiryDate: "16 August 2029",
    scope: [
      "Manufacturing, Fabrication and Engineering work for Railway Carriage Fans (110V AC 450 mm Sweep Fixed Type, Brush Less DC 400 mm Sweep and 110V DC Fixed Type)",
      "Fan Guard Assembly",
      "Electric Control Panels",
      "Rail Coach Assembly Parts",
      "BIO Retention Tank",
      "S.S. Lavatory Inlay and Powder Coating",
      "CNC Machining and Turning",
      "Signaling Relay Child Parts and Set of Magnetic Path of Relay"
    ],
    verifyUrl: "https://www.isobv.in",
    certificateFile: "/certificates/iso-9001-2015.pdf",
    certificatePreview: "/images/iso-9001-certificate-preview.webp"
  },

  products: [
    {
      id: "railway-signal-relay-assembly",
      name: "Railway Signal Relay Assembly",
      shortName: "Relay Assembly",
      slug: "/products/railway-signal-relay-assembly",
      isMajor: true,
      imageKey: "product-relay-single",
      summary: "Precision electromagnetic relay assemblies for railway signalling circuits including points, track detection, and signals. Tested before dispatch and foam packed for safe transit.",
      finish: "Mounting bracket with gold-yellow electroplated finish.",
      packaging: "Individual and tray foam-packed for safe transit.",
      testing: "Coil resistance, contact continuity, operate and release action tested before dispatch.",
      keyFeatures: [
        "Electromagnetic coil wound and insulated to exact specification",
        "Armature and contact assembly engineered for positive switching",
        "Rigid mounting bracket with protective gold-yellow electroplated finish",
        "Full batch testing before packing: coil resistance, contact continuity, operate and release action",
        "Foam packing designed for transit protection"
      ]
    },
    {
      id: "relay-child-parts",
      name: "Railway Signal Relay Child Parts",
      shortName: "Relay Child Parts",
      slug: "/products/relay-child-parts",
      isMajor: false,
      imageKey: "relay-child-parts-flatlay",
      summary: "Precision machined and pressed components including armature pins, spacer bushes, flat washers, mounting brackets, and electromagnetic coils.",
      finish: "Electroplated gold-yellow and natural precision finishes.",
      packaging: "Corrosion-inhibiting packing in batch lots.",
      testing: "Dimensional verification, thread inspection, and burr checking against drawings.",
      parts: [
        {
          name: "Armature Pin",
          function: "Threaded pivot pin providing smooth mechanical movement for the relay armature.",
          machine: "CNC turning and Traub automatic lathe"
        },
        {
          name: "Spacer Bush",
          function: "Maintains accurate spacing between structural relay plates and contact banks.",
          machine: "Traub automatic lathe and CNC turning"
        },
        {
          name: "Flat Washer",
          function: "Distributes clamping load uniformly across fasteners to protect mounting faces.",
          machine: "Press machines 10 to 75 ton"
        },
        {
          name: "Mounting Bracket",
          function: "Rigid metal bracket supporting the entire relay mechanism with gold-yellow protective finish.",
          machine: "Press machines and in-house electroplating"
        },
        {
          name: "Coil",
          function: "Electromagnetic actuation component generating the magnetic field required to switch contacts.",
          machine: "Coil winding, vacuum annealing furnace stress relief, and resistance testing"
        }
      ]
    },
    {
      id: "coach-fan-guard-mild-steel",
      name: "Coach Fan Guard in Mild Steel",
      shortName: "Fan Guard (Mild Steel)",
      slug: "/products/coach-fan-guards",
      isMajor: false,
      imageKey: "fanguard-mild-steel",
      summary: "Radial wire fan guards manufactured from mild steel with uniform powder-coated finish for railway coach passenger compartment fans.",
      finish: "Durable electrostatic powder coating.",
      packaging: "Protective corrugated carton packing with corner buffers.",
      testing: "Wire spacing verification, weld joint pull strength, and surface finish uniformity."
    },
    {
      id: "coach-fan-guard-stainless-steel",
      name: "Coach Fan Guard in Stainless Steel",
      shortName: "Fan Guard (Stainless Steel)",
      slug: "/products/coach-fan-guards",
      isMajor: false,
      imageKey: "fanguard-stainless",
      summary: "Corrosion-resistant radial wire fan guards manufactured from stainless steel with polished finish for railway coaches.",
      finish: "Polished smooth metallic finish.",
      packaging: "Protective poly-wrap and sturdy carton packing.",
      testing: "Weld joint integrity, wire spacing inspection, and polish quality."
    },
    {
      id: "pillar-bush",
      name: "Industrial Pillar Bush",
      shortName: "Pillar Bush",
      slug: "/products/pillar-bush",
      isMajor: false,
      imageKey: "product-pillar-bush",
      summary: "Turned pillar bushes for press tool and die sets, made to your drawing in our Pithampur works.",
      finish: "Turned precision surface finish as per drawing.",
      packaging: "Protective batch packing.",
      testing: "Dimensional verification, threads and burrs against drawing."
    },
    {
      id: "stainless-steel-bush",
      name: "Stainless Steel Bush",
      shortName: "Stainless Steel Bush",
      slug: "/products/stainless-steel-bush",
      isMajor: false,
      imageKey: "product-stainless-steel-bush",
      summary: "Turned stainless steel bushes made to your drawing in our Pithampur works. Used to line bores, space parts or guide moving parts.",
      finish: "Turned corrosion-resistant surface finish as per drawing.",
      packaging: "Protective batch packing.",
      testing: "Dimensional verification, threads and burrs against drawing."
    }
  ],

  machines: [
    {
      id: "cnc",
      name: "CNC Turning and Fabrication",
      summary: "Turning of pins, bushes and shafts, and fabrication to customer requirements.",
      partsMade: "Armature pin, spacer bush.",
      imageKey: "machine-cnc"
    },
    {
      id: "press",
      name: "Press Machines, 10 to 75 ton",
      summary: "Blanking, punching and forming of pressed components.",
      partsMade: "Flat washer, mounting bracket.",
      imageKey: "machine-press"
    },
    {
      id: "vmc",
      name: "Vertical Machining Centre (VMC)",
      summary: "Milling, drilling and slotting.",
      imageKey: "machine-vmc"
    },
    {
      id: "dro",
      name: "DRO Machine",
      summary: "Drilling with digital position readout.",
      imageKey: "machine-dro"
    },
    {
      id: "traub",
      name: "Traub Machine",
      summary: "Automatic turning for repeat production.",
      imageKey: "machine-traub"
    }
  ],

  processes: [
    {
      step: 1,
      title: "Raw Material Inspection",
      station: "Raw Material Store and Inward Inspection Area",
      description: "Inward inspection of mild steel wire, sheets, stainless steel, and brass rounds against mill certificates and test standards.",
      checked: "Material grade, surface defects, diameter, sheet thickness, chemical composition certificates.",
      output: "Accepted and colour-coded raw material lots moved to production bays.",
      imageKey: "process-raw-material"
    },
    {
      step: 2,
      title: "Machining and Pressing",
      station: "CNC, Traub Lathe, VMC, and Press Machine Bays",
      description: "Turning of pins and bushes, stamping of brackets and washers, and milling.",
      checked: "Dimensions, thread pitch, hole centres, burrs, tolerances against component drawings.",
      output: "Formed and machined component blanks ready for surface treatment.",
      imageKey: "machine-cnc"
    },
    {
      step: 3,
      title: "In-House Finishing",
      station: "Plating Bays, Powder Coating Line, and Vacuum Furnace",
      description: "In-house electroplating provides corrosion protection and gold-yellow finish on relay parts. Electrostatic powder coating produces durable painted finish on mild steel fan guards. Vacuum annealing furnace provides stress relief in controlled vacuum atmosphere.",
      checked: "Plating thickness, coating adhesion, surface uniformity, thermal cycle vacuum log.",
      output: "Finished corrosion-resistant child parts and coated fan guard frames.",
      imageKey: "process-electroplating"
    },
    {
      step: 4,
      title: "Assembly and Electrical Testing",
      station: "Clean Assembly Benches and Relay Test Benches",
      description: "Mechanical assembly of coils, armatures, contacts, and brackets. Resistance testing, operate and release action verification, and contact continuity checks.",
      checked: "Coil resistance (ohms), contact continuity, operate voltage, release action, mechanical play.",
      output: "Fully assembled, serialized, and test-verified relay units and fan guards.",
      imageKey: "process-assembly-testing"
    },
    {
      step: 5,
      title: "Protective Packing and Dispatch",
      station: "Packing Station and Final Dispatch Bay",
      description: "Foam packing of delicate relay assemblies for transit protection, batch boxing of child parts, and corrugated packing of coach fan guards.",
      checked: "Quantity match against purchase order, visual inspection, foam packing integrity, box labelling.",
      output: "Transit-ready consignments accompanied by test reports and dispatch documentation.",
      imageKey: "process-packing"
    }
  ],

  qualityCheckpoints: [
    {
      stage: "Machined and Pressed Parts",
      checks: "Dimensions, threads, concentricity, and burrs verified against engineering drawings using calibrated vernier calipers, micrometers, and plug gauges."
    },
    {
      stage: "Relay Assemblies",
      checks: "Coil resistance measurement, contact continuity under closed conditions, operate and release mechanical action verification."
    },
    {
      stage: "Coach Fan Guards",
      checks: "Radial wire spacing verification, welded joint pull strength, powder coating adhesion, and stainless steel surface polish inspection."
    },
    {
      stage: "Pre-Dispatch Inspection",
      checks: "Consignment quantity count, visual condition check, foam packing security, and protective packaging against transit damage."
    }
  ],

  jobWork: {
    description: "New Durga Wire Netting Work undertakes job work for OEMs and railway component contractors based on customer drawings or physical samples.",
    services: [
      {
        name: "CNC and Automatic Turning",
        details: "Turning of pins, bushes, sleeves, and fasteners in mild steel, stainless steel, and brass."
      },
      {
        name: "Press Work (10 to 75 Ton)",
        details: "Blanking, punching, and forming of brackets, washers, clips, and sheet metal parts."
      },
      {
        name: "VMC and DRO Machining",
        details: "Milling, drilling, and slotting."
      },
      {
        name: "Fabrication and Wire Netting",
        details: "Radial wire welding, guard ring fabrication, assembly spot welding, and wire work."
      }
    ],
    enquiryRequirements: [
      "Engineering drawing (PDF or CAD) or physical component sample",
      "Specified material grade and required batch quantity",
      "Dimensional tolerances and surface finish requirement",
      "Delivery schedule requirement and destination"
    ]
  },

  clients: [
    {
      name: "CG Power and Industrial Solutions Limited",
      shortName: "CG Power",
      logo: "/images/clients/cg-power.webp",
      alt: "CG Power and Industrial Solutions Limited logo",
      width: 240,
      height: 90
    },
    {
      name: "Rotomotive Power Drives India Limited",
      shortName: "Rotomotive Power Drives",
      logo: "/images/clients/rotomotive.webp",
      alt: "Rotomotive Power Drives India Limited logo",
      width: 240,
      height: 90
    },
    {
      name: "Lucas TVS",
      shortName: "Lucas TVS",
      logo: "/images/clients/lucas-tvs.webp",
      alt: "Lucas TVS logo",
      width: 240,
      height: 90
    },
    {
      name: "Areca Embedded Systems Pvt Ltd",
      shortName: "Areca Embedded Systems",
      logo: "/images/clients/areca.webp",
      alt: "Areca Embedded Systems logo",
      width: 240,
      height: 90
    },
    {
      name: "Electrotecnica Systems Pvt Ltd",
      shortName: "Electrotecnica Systems",
      logo: "/images/clients/electrotecnica.webp",
      alt: "Electrotecnica Systems logo",
      width: 240,
      height: 90
    },
    {
      name: "Digital Communication & Control Pvt Ltd",
      shortName: "Digital Communication & Control",
      logo: "/images/clients/digital-communication.webp",
      alt: "Digital Communication and Control logo",
      width: 240,
      height: 90
    },
    {
      name: "Westinghouse Saxby Farmer Limited",
      shortName: "Westinghouse Saxby Farmer",
      logo: "/images/clients/westinghouse.webp",
      alt: "Westinghouse Saxby Farmer Limited logo",
      width: 240,
      height: 90
    }
  ],

  regionsServed: [
    {
      name: "Gorakhpur",
      zone: "North Eastern Railway",
      details: "Signalling relay assemblies and child parts supplied for North Eastern Railway jurisdiction."
    },
    {
      name: "Udhna, Surat",
      zone: "Western Railway",
      details: "Coach equipment components and relay child parts supplied for Western Railway division."
    },
    {
      name: "Mumbai",
      zone: "Western and Central Railway",
      details: "Signalling components and coach fan guards supplied across Mumbai rail divisions."
    }
  ]
};
