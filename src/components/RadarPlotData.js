const radarDataList = [
  [
    {
      ZSTAT: 0.9625799999999999,
      study_id: 'GWAS_0',
      trait: 'Osteoarthritis Knee',
      traitCategory: 'BI: Safety',
    },
    {
      ZSTAT: 0.17773,
      study_id: 'GWAS_55',
      trait: 'Intelligence',
      traitCategory: 'BI: Psychiatric',
    },
    {
      ZSTAT: 0.21544000000000002,
      study_id: 'GWAS_64',
      trait: 'Estimated glomerular filtration rate (eGFR)',
      traitCategory: 'BI: Kidney',
    },
    {
      ZSTAT: 1.379,
      study_id: 'GWAS_67',
      trait: 'Heart failure',
      traitCategory: 'BI: Cardiometabolic',
    },
    {
      ZSTAT: 1.47331999999999996,
      study_id: 'GWAS_68',
      trait: 'Early age-related macular degeneration',
      traitCategory: 'BI: Safety',
    },
    {
      ZSTAT: 0.19618,
      study_id: 'GWAS_78',
      trait: 'Extraversion',
      traitCategory: 'BI: Psychiatric',
    },
    {
      ZSTAT: 0.63574,
      study_id: 'GWAS_173',
      trait: 'Abnormal results of liver function studies (ICD10: R94.5)',
      traitCategory: 'BI: Liver',
    },
    {
      ZSTAT: 2.2964,
      study_id: 'FINNGEN_R5_Q17_CONGEN_DEFORMITI_FEET',
      trait: 'Congenital deformities of feet',
      traitCategory: 'genetic, familial or congenital disease',
    },
    {
      ZSTAT: 0.96096,
      study_id: 'FINNGEN_R5_Q17_CONGEN_DEFORMITI_HIP',
      trait: 'Congenital deformities of hip',
      traitCategory: 'musculoskeletal or connective tissue disease',
    },
    {
      ZSTAT: 1.4883,
      study_id: 'FINNGEN_R5_Q17_CONGEN_MALFO_ANTER_SEGMENT_EYE',
      trait: 'Congenital malformations of anterior segment of eye',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.22601,
      study_id: 'FINNGEN_R5_Q17_CONGEN_MALFO_AORTIC_MITRAL_VALVES',
      trait: 'Congenital malformations of aortic and mitral valves',
      traitCategory: 'cardiovascular disease',
    },
    {
      ZSTAT: 0.5881,
      study_id: 'FINNGEN_R5_Z21_TOBAC_USE',
      trait: 'Tobacco use',
      traitCategory: 'nervous system disease',
    },
    {
      ZSTAT: 0.7253899999999999,
      study_id: 'FINNGEN_R5_Z21_TRANSPLANTED_ORGAN_TISSUE_STATUS',
      trait: 'Transplanted organ and tissue status',
      traitCategory: 'measurement',
    },
  ],
  [
    {
      ZSTAT: 1.0141,
      study_id: 'FINNGEN_R5_G6_DISOTHUNS',
      trait: 'Disorders of other and unspecified cranial nerves',
      traitCategory: 'nervous system disease',
    },
    {
      ZSTAT: 0.67981,
      study_id: 'FINNGEN_R5_M13_RHEUMA_INCLAVO',
      trait: 'Rheumatoid arthritis',
      traitCategory: 'musculoskeletal or connective tissue disease',
    },
    {
      ZSTAT: 0.74647,
      study_id: 'FINNGEN_R5_M13_ROTATORCUFF',
      trait: 'Rotator cuff syndrome',
      traitCategory: 'musculoskeletal or connective tissue disease',
    },
    {
      ZSTAT: 1.483,
      study_id: 'FINNGEN_R5_M13_SCIATICA',
      trait: 'Siatica+with lumbago',
      traitCategory: 'musculoskeletal or connective tissue disease',
    },
    {
      ZSTAT: 1.1433,
      study_id: 'FINNGEN_R5_M13_SCOLIOSIS',
      trait: 'Scoliosis',
      traitCategory: 'musculoskeletal or connective tissue disease',
    },
    {
      ZSTAT: 0.1857,
      study_id: 'FINNGEN_R5_M13_SHORTACHILLES',
      trait: 'Short Achilles tendon (acquired)',
      traitCategory: 'phenotype',
    },
    {
      ZSTAT: 1.3219,
      study_id: 'FINNGEN_R5_ST19_SEQUEL_INJURI_HEAD',
      trait: 'Sequelae of injuries of head',
      traitCategory: 'injury, poisoning or other complication',
    },
    {
      ZSTAT: 0.56358,
      study_id: 'FINNGEN_R5_ST19_SEQUEL_INJURI_LOWER_LIMB',
      trait: 'Sequelae of injuries of lower limb',
      traitCategory: 'injury, poisoning or other complication',
    },
    {
      ZSTAT: 0.43328,
      study_id: 'FINNGEN_R5_ST19_SEQUEL_INJURI_NECK_TRUNK',
      trait: 'Sequelae of injuries of neck and trunk',
      traitCategory: 'injury, poisoning or other complication',
    },
    {
      ZSTAT: 0.81718,
      study_id: 'FINNGEN_R5_ST19_SEQUEL_INJURI_UPPER_LIMB',
      trait: 'Sequelae of injuries of upper limb',
      traitCategory: 'injury, poisoning or other complication',
    },
    {
      ZSTAT: 0.0056942,
      study_id: 'FINNGEN_R5_ST19_SUPERF_FROST',
      trait: 'Superficial frostbite',
      traitCategory: 'injury, poisoning or other complication',
    },
    {
      ZSTAT: 0.039746,
      study_id: 'FINNGEN_R5_ST19_SUPERF_INJURI_INVOLVI_MULTIPLE_BODY_REGIONS',
      trait: 'Superficial injuries involving multiple body regions',
      traitCategory: 'injury, poisoning or other complication',
    },
    {
      ZSTAT: 0.35243,
      study_id: 'FINNGEN_R5_ST19_SUPERF_INJURY_ANKLE_FOOT',
      trait: 'Superficial injury of ankle and foot',
      traitCategory: 'musculoskeletal or connective tissue disease',
    },
    {
      ZSTAT: 0.54598,
      study_id: 'FINNGEN_R5_Z21_OTHER_MEDICAL_CARE',
      trait: 'Other medical care',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.5677399999999999,
      study_id: 'FINNGEN_R5_Z21_OTHER_ORTHOPA_FOLLOW__CARE',
      trait: 'Other orthopaedic follow-up care',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.7046899999999999,
      study_id: 'FINNGEN_R5_Z21_OTHER_POSTS_STATES',
      trait: 'Other postsurgical states',
      traitCategory: 'biological process',
    },
    {
      ZSTAT: 0.086745,
      study_id:
        'FINNGEN_R5_Z21_OTHER_SPECIAL_EXAM_INVES_PERSONS_WO_COMPLA_REPOR_DIAGNOSIS',
      trait:
        'Other special examinations and investigations of persons without complaint or reported diagnosis',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 1.3591,
      study_id: 'FINNGEN_R5_Z21_OTHER_SURGI_FOLLOW__CARE',
      trait: 'Other surgical follow-up care',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.98811,
      study_id: 'FINNGEN_R5_Z21_OUTCO_DELIV',
      trait: 'Outcome of delivery',
      traitCategory: 'measurement',
    },
    {
      ZSTAT: 0.11419000000000001,
      study_id: 'FINNGEN_R5_Z21_PERSONAL_HISTORY_CERTA_OTH_DISEA',
      trait: 'Personal history of certain other diseases',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 2.5383,
      study_id: 'FINNGEN_R5_Z21_PERSONAL_HISTORY_MALIG_NEOPLASM',
      trait: 'Personal history of malignant neoplasm',
      traitCategory: 'cell proliferation disorder',
    },
    {
      ZSTAT: 0.87382,
      study_id: 'FINNGEN_R5_Z21_PERSONAL_HISTORY_OTH_DISEA_CONDI',
      trait: 'Personal history of other diseases and conditions',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.44122,
      study_id:
        'FINNGEN_R5_Z21_PERSONS_ENCOUNTERI_HEALTH_SERVI_CIRCUMSTANC_RELATED_REPRODUCTION',
      trait:
        'Persons encountering health services in circumstances related to reproduction',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.48881,
      study_id: 'FINNGEN_R5_Z21_PERSONS_ENCOUNTERI_HEALTH_SERVI_EXAM_INVES',
      trait:
        'Persons encountering health services for examination and investigation',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 1.6905000000000001,
      study_id:
        'FINNGEN_R5_Z21_PERSONS_ENCOUNTERI_HEALTH_SERVI_OTH_CIRCUMSTANC1',
      trait: 'Persons encountering health services in other circumstances',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 1.3875,
      study_id:
        'FINNGEN_R5_Z21_PERSONS_ENCOUNTERI_HEALTH_SERVI_OTH_CIRCUMSTANC2',
      trait: 'Persons encountering health services in other circumstances',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 1.65,
      study_id:
        'FINNGEN_R5_Z21_PERSONS_ENCOUNTERI_HEALTH_SERVI_SPECIFIC_PROCED_HEALTH_CARE',
      trait:
        'Persons encountering health services for specific procedures and health care',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.59062,
      study_id:
        'FINNGEN_R5_Z21_PERSONS_W_POTEN_HEALTH_HAZARDS_RELATED_COMMUNICAB_DISEA',
      trait:
        'Persons with potential health hazards related to communicable diseases',
      traitCategory: 'infectious disease',
    },
    {
      ZSTAT: 0.37009000000000003,
      study_id:
        'FINNGEN_R5_Z21_PERSONS_W_POTEN_HEALTH_HAZARDS_RELATED_FAMILY_PERSONAL_HISTORY_CERTA_CONDI_INFLUENCI_HEALTH_STATUS',
      trait:
        'Persons with potential health hazards related to family and personal history and certain conditions influencing health status',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 1.5901,
      study_id:
        'FINNGEN_R5_Z21_PERSONS_W_POTEN_HEALTH_HAZARDS_RELATED_SOCIO_PSYCHOSO_CIRCUMSTANC',
      trait:
        'Persons with potential health hazards related to socioeconomic and psychosocial circumstances',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.80795,
      study_id: 'FINNGEN_R5_Z21_POSTPA_CARE_EXAMI',
      trait: 'Postpartum care and examination',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.023866,
      study_id: 'FINNGEN_R5_Z21_PREGNAC_EXAM_TEST',
      trait: 'Pregnancy examination and test',
      traitCategory: 'biological process',
    },
    {
      ZSTAT: 0.91507,
      study_id: 'FINNGEN_R5_Z21_PRESENCE_CARDIAC_VASCULAR_IMPLANTNTS_GRAFTS',
      trait: 'Presence of cardiac and vascular implants and grafts',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.8311700000000001,
      study_id: 'FINNGEN_R5_Z21_PRESENCE_OTH_DEVICES',
      trait: 'Presence of other devices',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.93861,
      study_id: 'FINNGEN_R5_Z21_PRESENCE_OTH_FUNCTIONAL_IMPLANTNTS',
      trait: 'Presence of other functional implants',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 2.0527,
      study_id: 'FINNGEN_R5_Z21_PROBL_RELATED_CARE__DEPENDENCY',
      trait: 'Problems related to care-provider dependency',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.5361199999999999,
      study_id: 'FINNGEN_R5_Z21_PROBL_RELATED_CERTA_PSYCHOSO_CIRCUMSTANC',
      trait: 'Problems related to certain psychosocial circumstances',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.8942399999999999,
      study_id: 'FINNGEN_R5_Z21_PROBL_RELATED_EMPLO_UNEMP',
      trait: 'Problems related to employment and unemployment',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 1.2304,
      study_id: 'FINNGEN_R5_Z21_PROBL_RELATED_HOUSI_ECONO_CIRCUMSTANC',
      trait: 'Problems related to housing and economic circumstances',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 0.023951,
      study_id: 'FINNGEN_R5_Z21_SPECIAL_SCREEN_EXAM_OTH_DISEA_DISORD',
      trait: 'Special screening examination for other diseases and disorders',
      traitCategory: 'Uncategorised',
    },
    {
      ZSTAT: 1.5426,
      study_id: 'FINNGEN_R5_Z21_SUPERV_HIGH_R_PREGNAC',
      trait: 'Supervision of high-risk pregnancy',
      traitCategory: 'reproductive system or breast disease',
    },
    {
      ZSTAT: 0.58254,
      study_id: 'FINNGEN_R5_Z21_SUPERV_NORMAL_PREGNAC1',
      trait: 'Supervision of normal pregnancy',
      traitCategory: 'biological process',
    },
    {
      ZSTAT: 0.51973,
      study_id: 'FINNGEN_R5_Z21_TOBAC_USE',
      trait: 'Tobacco use',
      traitCategory: 'nervous system disease',
    },
    {
      ZSTAT: 0.9698,
      study_id: 'FINNGEN_R5_Z21_TRANSPLANTED_ORGAN_TISSUE_STATUS',
      trait: 'Transplanted organ and tissue status',
      traitCategory: 'measurement',
    },
    {
      ZSTAT: 2.2962,
      study_id: 'GWAS_130',
      trait: 'Body mass index (BMI)',
      traitCategory: 'BI: Obesity',
    },
  ],
];
const RadarData = data => {
  data = [];
  return (data = radarDataList.map(item => [
    ...new Set(
      item.map(obj => ({
        traitCategory: obj.traitCategory,
        trait: obj.trait,
        ZSTAT: obj.ZSTAT,
      }))
    ),
  ]));
};
export default RadarData;
