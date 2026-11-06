import { Doctor, Polyclinic, AmbulanceTracker } from '../types';

export const mockPolyclinics: Polyclinic[] = [
  {
    id: 'poli-umum',
    code: 'POL-01',
    name: { id: 'Poli Umum', en: 'General Outpatient Clinic' },
    floor: 'Lt 1',
    wing: 'North Wing',
    iconName: 'Stethoscope',
    description: {
      id: 'Pelayanan pemeriksaan kesehatan umum, triage awal, dan konsultasi preventif oleh dokter umum berpengalaman.',
      en: 'Primary health consultations, general checkups, initial triage, and preventive care by experienced general practitioners.'
    },
    leadDoctor: 'dr. Surya',
    facilities: ['Konsultasi Umum', 'Pemeriksaan Tanda Vital', 'Surat Keterangan Sehat', 'Vaksinasi Dewasa'],
    queueCurrent: 14,
    estimatedWaitMinutes: 12
  },
  {
    id: 'poli-anak',
    code: 'POL-02',
    name: { id: 'Poli Anak (Pediatrik)', en: 'Pediatric Clinic' },
    floor: 'Lt 1',
    wing: 'North Wing',
    iconName: 'Baby',
    description: {
      id: 'Perawatan komprehensif untuk tumbuh kembang, imunisasi, dan penanganan penyakit infeksi maupun alergi anak dalam lingkungan ramah anak.',
      en: 'Comprehensive care for child growth and development, immunizations, pediatric infectious diseases and allergies in a kid friendly environment.'
    },
    leadDoctor: 'dr. Anggi, Sp.A',
    facilities: ['Tumbuh Kembang Center', 'Ruang Menyusui Nyaman', 'Pojok Bermain Steril', 'Imunisasi Terjadwal'],
    queueCurrent: 8,
    estimatedWaitMinutes: 15
  },
  {
    id: 'poli-obsgyn',
    code: 'POL-03',
    name: { id: 'Poli Kebidanan & Kandungan (Obsgyn)', en: 'Obstetrics & Gynecology' },
    floor: 'Lt 1',
    wing: 'South Wing',
    iconName: 'HeartHandshake',
    description: {
      id: 'Pelayanan kesehatan reproduksi wanita, antenatal care USG 4D/HD Live, deteksi dini kanker serviks, serta program kehamilan.',
      en: 'Women reproductive health, antenatal care with 4D/HD Live Ultrasound, early cervical screening, and fertility consultations.'
    },
    leadDoctor: 'dr. Miftah Putra, Sp.OG',
    facilities: ['USG 4D HD Live', 'Kamar Pemeriksaan Privat', 'Konseling Laktasi', 'Screening Papsmear & HPV'],
    queueCurrent: 11,
    estimatedWaitMinutes: 20
  },
  {
    id: 'poli-penyakit-dalam',
    code: 'POL-04',
    name: { id: 'Poli Penyakit Dalam (Internis)', en: 'Internal Medicine Clinic' },
    floor: 'Lt 2',
    wing: 'North Wing',
    iconName: 'Activity',
    description: {
      id: 'Diagnosis dan tatalaksana komprehensif penyakit metabolik, diabetes, hipertensi, gangguan ginjal, gastrointestinal, dan autoimun.',
      en: 'Diagnosis and management of metabolic diseases, diabetes, hypertension, renal disorders, gastrointestinal, and autoimmune conditions.'
    },
    leadDoctor: 'dr. Jonathan Situmorang, Sp.PD, KKV',
    facilities: ['Monitoring Diabetes Terpadu', 'Konseling Nutrisi Klinis', 'Endoskopi Saluran Cerna', 'Spirometri Dasar'],
    queueCurrent: 19,
    estimatedWaitMinutes: 25
  },
  {
    id: 'poli-jantung',
    code: 'POL-05',
    name: { id: 'Poli Jantung & Pembuluh Darah', en: 'Cardiovascular Clinic' },
    floor: 'Lt 5',
    wing: 'South Wing',
    iconName: 'HeartPulse',
    description: {
      id: 'Pusat Jantung Terpadu dengan fasilitas Treadmill Stress Test, Ekokardiografi Doppler, Holter Monitoring, dan Cath Lab 24 Jam.',
      en: 'Integrated Heart Center equipped with Treadmill Stress Test, Doppler Echocardiography, Holter Monitoring, and 24/7 Cath Lab.'
    },
    leadDoctor: 'dr. Sarah Lubis, Sp.JP',
    facilities: ['Cath Lab Angiografi', 'Ekokardiografi 3D', 'Treadmill Stress Test', 'Holter Monitoring 48 Jam'],
    queueCurrent: 6,
    estimatedWaitMinutes: 18
  },
  {
    id: 'poli-gigi',
    code: 'POL-06',
    name: { id: 'Poli Gigi & Mulut (Dental Center)', en: 'Dental & Oral Health Center' },
    floor: 'Lt 1',
    wing: 'North Wing',
    iconName: 'Smile',
    description: {
      id: 'Perawatan estetik gigi, bedah mulut, ortodonti, implan gigi, dan konservasi gigi dengan teknologi radiografi panoramik digital.',
      en: 'Cosmetic dentistry, oral surgery, orthodontics, dental implants, and endodontics with panoramic digital radiography.'
    },
    leadDoctor: 'drg. Bobby, Sp.KG',
    facilities: ['Dental X Ray Panoramik', 'Sterilisasi Autoklaf Kelas B', 'Implant Suite', 'Whitening Express'],
    queueCurrent: 5,
    estimatedWaitMinutes: 10
  },
  {
    id: 'poli-saraf',
    code: 'POL-07',
    name: { id: 'Poli Saraf (Neurologi)', en: 'Neurology Clinic' },
    floor: 'Lt 2',
    wing: 'South Wing',
    iconName: 'Brain',
    description: {
      id: 'Penanganan stroke akut, epilepsi, nyeri neuropatik, vertigo, migrain, dan gangguan saraf tepi didukung EEG dan EMG canggih.',
      en: 'Care for acute stroke recovery, epilepsy, neuropathic pain, vertigo, migraine, and peripheral nerve disorders with EEG and EMG.'
    },
    leadDoctor: 'dr. Rizky Ramadan Harahap, Sp.S',
    facilities: ['EEG Digital 32 Channel', 'EMG/NCS Test', 'Klinik Memori & Demensia', 'Unit Terapi Nyeri'],
    queueCurrent: 9,
    estimatedWaitMinutes: 22
  },
  {
    id: 'poli-paru',
    code: 'POL-08',
    name: { id: 'Poli Paru & Respirasi', en: 'Pulmonology Clinic' },
    floor: 'Lt 2',
    wing: 'South Wing',
    iconName: 'Wind',
    description: {
      id: 'Penanganan asma, PPOK, pneumonia, TBC, dan alergi saluran napas dengan ruang bronkoskopi serta tes fungsi paru lengkap.',
      en: 'Management of asthma, COPD, pneumonia, tuberculosis, and respiratory allergies with bronchoscopy and pulmonary function tests.'
    },
    leadDoctor: 'dr. Faisal Daulay, Sp.P',
    facilities: ['Spirometri Digital', 'Bronkoskopi Fleksibel', 'Kamar Inhalasi/Nebulisasi Steril', 'Pojok DOTS Terisolasi'],
    queueCurrent: 7,
    estimatedWaitMinutes: 15
  },
  {
    id: 'poli-mata',
    code: 'POL-09',
    name: { id: 'Poli Mata (Oftalmologi)', en: 'Eye & Ophthalmology Clinic' },
    floor: 'Lt 2',
    wing: 'North Wing',
    iconName: 'Eye',
    description: {
      id: 'Pemeriksaan tajam penglihatan digital, laser retina, tonometri non kontak, dan operasi katarak fakoemulsifikasi sayatan mini.',
      en: 'Digital visual acuity tests, retinal laser treatments, non contact tonometry, and sutureless phacoemulsification cataract surgeries.'
    },
    leadDoctor: 'dr. Budi Siregar, Sp.M',
    facilities: ['Optical Coherence Tomography (OCT)', 'Laser YAG & Argon', 'Slit Lamp Digital', 'Phaco Center'],
    queueCurrent: 12,
    estimatedWaitMinutes: 16
  },
  {
    id: 'poli-tht',
    code: 'POL-10',
    name: { id: 'Poli THT, BKL', en: 'ENT (Ear, Nose & Throat) Clinic' },
    floor: 'Lt 2',
    wing: 'North Wing',
    iconName: 'Ear',
    description: {
      id: 'Layanan endoskopi THT resolusi tinggi, tes audiometri kedap suara, timpanometri, dan penanganan sinusitis serta gangguan tidur.',
      en: 'High definition ENT endoscopy, sound proof audiometry cabin, tympanometry, and treatment for sinusitis and sleep apnea.'
    },
    leadDoctor: 'dr. Hendra Ginting, Sp.THT, BKL',
    facilities: ['Endoskopi Nasofaring HD', 'Bilik Audiometri Kedap Suara', 'Timpanometri', 'Ear Toilet Mikroskopis'],
    queueCurrent: 8,
    estimatedWaitMinutes: 14
  },
  {
    id: 'poli-kulit',
    code: 'POL-11',
    name: { id: 'Poli Dermatologi & Venereologi', en: 'Dermatology & Venereology' },
    floor: 'Lt 2',
    wing: 'South Wing',
    iconName: 'Sparkles',
    description: {
      id: 'Klinik perawatan kulit medis, laser estetika, terapi jerawat membandel, eksim, psoriasis, dan infeksi menular seksual secara rahasia.',
      en: 'Medical dermatology, aesthetic lasers, treatment for stubborn acne, eczema, psoriasis, and confidential venereology care.'
    },
    leadDoctor: 'dr. Maya Fitriani Karo Karo, Sp.DVE',
    facilities: ['Laser Q Switched & Fractional', 'Dermatoskopi Digital', 'Kauterisasi & Bedah Kulit Minor', 'Lounge Konsultasi Privat'],
    queueCurrent: 10,
    estimatedWaitMinutes: 15
  },
  {
    id: 'poli-bedah',
    code: 'POL-12',
    name: { id: 'Poli Bedah (Umum & Ortopedi)', en: 'Surgery & Orthopedics Clinic' },
    floor: 'Lt 5',
    wing: 'South Wing',
    iconName: 'Scissors',
    description: {
      id: 'Konsultasi pra dan pasca operasi, bedah laparoskopi invasif minimal, rekonstruksi sendi tulang, cedera olahraga, dan perawatan luka modern.',
      en: 'Pre & post operative consultations, minimally invasive laparoscopic surgery, joint replacement, sports injury, and modern wound care.'
    },
    leadDoctor: 'dr. Agung Hermansyah Manullang, Sp.OT',
    facilities: ['Klinik Gips & Imobilisasi', 'Modern Wound Dressing Unit', 'USG Muskuloskeletal', 'Ruang Tindakan Bedah Minor'],
    queueCurrent: 14,
    estimatedWaitMinutes: 20
  },
  {
    id: 'poli-fisioterapi',
    code: 'POL-13',
    name: { id: 'Poli Kedokteran Fisik & Rehabilitasi', en: 'Physical Medicine & Rehabilitation' },
    floor: 'Lt 1',
    wing: 'South Wing',
    iconName: 'ActivitySquare',
    description: {
      id: 'Rehabilitasi medik pasca stroke, pemulihan cedera saraf/tulang, terapi okupasi, terapi wicara, dan hidroterapi modern.',
      en: 'Post stroke motor rehabilitation, neurological/orthopedic injury recovery, occupational therapy, speech therapy, and hydrotherapy.'
    },
    leadDoctor: 'dr. Christine Tampubolon, Sp.KFR',
    facilities: ['Gymnasium Rehabilitasi Dewasa & Anak', 'Terapi Ultrasonik & Microwave Diathermy', 'Gait Training Track', 'Ruang Terapi Wicara'],
    queueCurrent: 6,
    estimatedWaitMinutes: 15
  },
  {
    id: 'poli-onkologi',
    code: 'POL-14',
    name: { id: 'Poli Onkologi & Kanker Terpadu', en: 'Comprehensive Oncology Center' },
    floor: 'Lt 5',
    wing: 'North Wing',
    iconName: 'Ribbon',
    description: {
      id: 'Layanan terintegrasi deteksi dini kanker, terapi sistemik kemoterapi one day care, imunoterapi target, serta pendampingan paliatif penuh kasih.',
      en: 'Integrated early cancer detection, one day care outpatient chemotherapy, targeted immunotherapy, and compassionate palliative care.'
    },
    leadDoctor: 'dr. Rahmatia Nasution, Sp.Onk.Rad',
    facilities: ['Ruang Kemo One Day Care dengan Kursi Elektrik', 'Laminar Airflow Steril untuk Oplos Obat Kemo', 'Konseling Paliatif & Psikoonkologi'],
    queueCurrent: 4,
    estimatedWaitMinutes: 10
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: 'doc-anggi',
    name: 'dr. Anggi, Sp.A',
    specialtyId: 'poli-anak',
    specialtyName: { id: 'Spesialis Anak', en: 'Pediatric Specialist' },
    subSpecialty: { id: 'Tumbuh Kembang & Pediatrik Sosial', en: 'Child Growth & Social Pediatrics' },
    degree: 'Sp.A (FK USU Medan)',
    experienceYears: 9,
    almamater: 'Universitas Sumatera Utara',
    strNumber: 'STR 12.01.2.1.2018.99120',
    rating: 4.9,
    reviewCount: 142,
    availableToday: true,
    floorNumber: 'Lt 1 (North Wing)',
    avatar: 'https://images.unsplash.com/photo-1594824813572-c51375d7b5b5?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'Batak', 'English'],
    schedules: [
      { day: 'Senin', startTime: '09:00', endTime: '13:00', room: 'Poli Anak 101, North Wing' },
      { day: 'Rabu', startTime: '09:00', endTime: '13:00', room: 'Poli Anak 101, North Wing' },
      { day: 'Jumat', startTime: '14:00', endTime: '18:00', room: 'Poli Anak 101, North Wing' },
      { day: 'Sabtu', startTime: '09:00', endTime: '12:00', room: 'Poli Anak 101, North Wing' }
    ],
    bio: {
      id: 'Dikenal ramah dan penuh kelembutan dalam menangani pasien bayi hingga remaja. Berfokus pada imunisasi tepat waktu dan optimalisasi nutrisi anak.',
      en: 'Renowned for gentle and compassionate pediatric care. Specializes in on time immunizations and holistic child nutritional optimization.'
    }
  },
  {
    id: 'doc-miftah',
    name: 'dr. Miftah Putra, Sp.OG',
    specialtyId: 'poli-obsgyn',
    specialtyName: { id: 'Spesialis Kebidanan & Kandungan', en: 'Obstetrics & Gynecology Specialist' },
    subSpecialty: { id: 'Kedokteran Fetomaternal & Laparoskopi', en: 'Fetomaternal Medicine & Laparoscopy' },
    degree: 'Sp.OG (FK USU Medan / Fellow Fetomaternal)',
    experienceYears: 13,
    almamater: 'Universitas Sumatera Utara & RSCM',
    strNumber: 'STR 12.02.1.1.2014.88219',
    rating: 4.95,
    reviewCount: 218,
    availableToday: true,
    floorNumber: 'Lt 1 (South Wing)',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'English'],
    schedules: [
      { day: 'Senin', startTime: '14:00', endTime: '19:00', room: 'Obsgyn Suite 112, South Wing' },
      { day: 'Selasa', startTime: '09:00', endTime: '13:00', room: 'Obsgyn Suite 112, South Wing' },
      { day: 'Kamis', startTime: '14:00', endTime: '19:00', room: 'Obsgyn Suite 112, South Wing' },
      { day: 'Sabtu', startTime: '10:00', endTime: '14:00', room: 'Obsgyn Suite 112, South Wing' }
    ],
    bio: {
      id: 'Ahli dalam pemeriksaan ultrasonografi janin tingkat lanjut, deteksi dini kelainan kongenital, dan persalinan metode ERACS yang minim rasa sakit.',
      en: 'Expert in high resolution fetal ultrasonography, early congenital anomaly detection, and pain managed ERACS deliveries.'
    }
  },
  {
    id: 'doc-agung',
    name: 'dr. Agung Hermansyah Manullang, Sp.OT',
    specialtyId: 'poli-bedah',
    specialtyName: { id: 'Spesialis Orthopaedi & Traumatologi', en: 'Orthopedic & Traumatology Specialist' },
    subSpecialty: { id: 'Artroskopi & Rekonstruksi Sendi', en: 'Arthroscopy & Joint Reconstruction' },
    degree: 'Sp.OT, FICS (FK UI / Fellow Singapore)',
    experienceYears: 16,
    almamater: 'Universitas Indonesia & NUH Singapore',
    strNumber: 'STR 12.04.1.2.2011.66312',
    rating: 4.9,
    reviewCount: 184,
    availableToday: true,
    floorNumber: 'Lt 7 (North Wing)',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'Batak Toba', 'English'],
    schedules: [
      { day: 'Selasa', startTime: '09:00', endTime: '13:00', room: 'Orthopedic Clinic 118' },
      { day: 'Rabu', startTime: '15:00', endTime: '19:00', room: 'Orthopedic Clinic 118' },
      { day: 'Jumat', startTime: '09:00', endTime: '13:00', room: 'Orthopedic Clinic 118' }
    ],
    bio: {
      id: 'Spesialis ortopedi berpengalaman dalam penggantian sendi lutut dan panggul (Arthroplasty) serta penanganan trauma patah tulang akibat kecelakaan.',
      en: 'Experienced in total knee and hip arthroplasty, minimally invasive arthroscopy, and complex trauma bone fracture repairs.'
    }
  },
  {
    id: 'doc-rizky',
    name: 'dr. Rizky Ramadan Harahap, Sp.S',
    specialtyId: 'poli-saraf',
    specialtyName: { id: 'Spesialis Neurologi (Saraf)', en: 'Neurology Specialist' },
    subSpecialty: { id: 'Stroke Intervensi & Neurovaskular', en: 'Interventional Stroke & Neurovascular' },
    degree: 'Sp.S, M.Ked(Neurol) (FK USU)',
    experienceYears: 11,
    almamater: 'Universitas Sumatera Utara',
    strNumber: 'STR 12.05.2.1.2016.55410',
    rating: 4.88,
    reviewCount: 130,
    availableToday: false,
    floorNumber: 'Lt 2 (South Wing)',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'Mandailing', 'English'],
    schedules: [
      { day: 'Senin', startTime: '10:00', endTime: '14:00', room: 'Neuro Clinic 208, South Wing' },
      { day: 'Rabu', startTime: '10:00', endTime: '14:00', room: 'Neuro Clinic 208, South Wing' },
      { day: 'Kamis', startTime: '14:00', endTime: '18:00', room: 'Neuro Clinic 208, South Wing' }
    ],
    bio: {
      id: 'Fokus pada golden period stroke terpadu di Medistra Horizon Code Stroke Team, pencegahan stroke berulang, dan penanganan neuralgia trigeminal.',
      en: 'Leads the Hospital Code Stroke Emergency Team, specialized in golden period thrombolysis and chronic migraine therapies.'
    }
  },
  {
    id: 'doc-sarah',
    name: 'dr. Sarah Lubis, Sp.JP',
    specialtyId: 'poli-jantung',
    specialtyName: { id: 'Spesialis Jantung & Pembuluh Darah', en: 'Cardiologist' },
    subSpecialty: { id: 'Kardiologi Intervensi & Aritmia (FIHA)', en: 'Interventional Cardiology (FIHA)' },
    degree: 'Sp.JP, FIHA (FK UI Jakarta)',
    experienceYears: 14,
    almamater: 'Universitas Indonesia (Kardiovaskular Harapan Kita)',
    strNumber: 'STR 12.06.3.1.2013.77112',
    rating: 4.96,
    reviewCount: 247,
    availableToday: true,
    floorNumber: 'Lt 7 (North Wing)',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'English'],
    schedules: [
      { day: 'Senin', startTime: '09:00', endTime: '13:00', room: 'Heart Center Suite 501' },
      { day: 'Selasa', startTime: '14:00', endTime: '18:00', room: 'Heart Center Suite 501' },
      { day: 'Kamis', startTime: '09:00', endTime: '13:00', room: 'Heart Center Suite 501' },
      { day: 'Jumat', startTime: '14:00', endTime: '18:00', room: 'Heart Center Suite 501' }
    ],
    bio: {
      id: 'Ahli pemasangan stent ring jantung (PCI), penanganan serangan jantung koroner akut 24 jam, serta pengelolaan gagal jantung kronis.',
      en: 'Pioneering cardiac interventionalist with deep expertise in emergency primary PCI, coronary stenting, and heart failure clinics.'
    }
  },
  {
    id: 'doc-maya',
    name: 'dr. Maya Fitriani Karo Karo, Sp.DVE',
    specialtyId: 'poli-kulit',
    specialtyName: { id: 'Spesialis Dermatologi, Venereologi & Estetika', en: 'Dermatology & Venereology Specialist' },
    subSpecialty: { id: 'Dermato Alergi & Laser Estetika Medis', en: 'Allergy Dermatology & Laser Therapeutics' },
    degree: 'Sp.DVE, FINSDV (FK USU Medan)',
    experienceYears: 10,
    almamater: 'Universitas Sumatera Utara',
    strNumber: 'STR 12.07.2.2.2017.33910',
    rating: 4.92,
    reviewCount: 165,
    availableToday: true,
    floorNumber: 'Lt 2 (South Wing)',
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'Karo', 'English'],
    schedules: [
      { day: 'Senin', startTime: '13:00', endTime: '17:00', room: 'Skin Center 214, South Wing' },
      { day: 'Rabu', startTime: '13:00', endTime: '17:00', room: 'Skin Center 214, South Wing' },
      { day: 'Jumat', startTime: '09:00', endTime: '13:00', room: 'Skin Center 214, South Wing' },
      { day: 'Sabtu', startTime: '09:00', endTime: '13:00', room: 'Skin Center 214, South Wing' }
    ],
    bio: {
      id: 'Praktisi dermatologi klinis terpercaya untuk pemulihan dermatitis atopik, psoriasis, peremajaan kulit aman berbasi bukti, dan penanganan jerawat kistik.',
      en: 'Trusted clinical dermatologist specializing in atopic dermatitis, autoimmune psoriasis, scar revision, and evidence based aesthetic therapies.'
    }
  },
  {
    id: 'doc-jonathan',
    name: 'dr. Jonathan Situmorang, Sp.PD, KKV',
    specialtyId: 'poli-penyakit-dalam',
    specialtyName: { id: 'Spesialis Penyakit Dalam, Konsultan Kardiovaskular', en: 'Internal Medicine, Cardiovascular Consultant' },
    subSpecialty: { id: 'Hipertensi & Penyakit Ginjal Metabolik', en: 'Hypertension & Metabolic Kidney Diseases' },
    degree: 'Sp.PD, KKV, FINASIM (FK USU / FK UI)',
    experienceYears: 18,
    almamater: 'Universitas Sumatera Utara',
    strNumber: 'STR 12.08.1.1.2009.44123',
    rating: 4.94,
    reviewCount: 290,
    availableToday: true,
    floorNumber: 'Lt 2 (North Wing)',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'Batak', 'English'],
    schedules: [
      { day: 'Senin', startTime: '08:30', endTime: '12:30', room: 'Poli Interna 202, North Wing' },
      { day: 'Selasa', startTime: '08:30', endTime: '12:30', room: 'Poli Interna 202, North Wing' },
      { day: 'Kamis', startTime: '08:30', endTime: '12:30', room: 'Poli Interna 202, North Wing' },
      { day: 'Jumat', startTime: '08:30', endTime: '11:30', room: 'Poli Interna 202, North Wing' }
    ],
    bio: {
      id: 'Senior internis dengan pendekatan komprehensif pada penderita penyakit dalam kronis, sindrom metabolik, diabetes melitus, dan hipertensi resisten.',
      en: 'Senior internist known for meticulous evaluation of chronic multimorbidities, diabetes management, and resistant hypertension.'
    }
  },
  {
    id: 'doc-faisal',
    name: 'dr. Faisal Daulay, Sp.P',
    specialtyId: 'poli-paru',
    specialtyName: { id: 'Spesialis Pulmonologi & Kedokteran Respirasi', en: 'Pulmonology & Respiratory Medicine' },
    subSpecialty: { id: 'Asma Berat & Infeksi Saluran Napas Kronis', en: 'Severe Asthma & Chronic Chest Infections' },
    degree: 'Sp.P, FAPSR (FK USU)',
    experienceYears: 12,
    almamater: 'Universitas Sumatera Utara',
    strNumber: 'STR 12.09.2.1.2015.11029',
    rating: 4.87,
    reviewCount: 114,
    availableToday: true,
    floorNumber: 'Lt 2 (South Wing)',
    avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'Mandailing', 'English'],
    schedules: [
      { day: 'Selasa', startTime: '13:00', endTime: '17:00', room: 'Respiratory Clinic 210' },
      { day: 'Kamis', startTime: '13:00', endTime: '17:00', room: 'Respiratory Clinic 210' },
      { day: 'Sabtu', startTime: '09:00', endTime: '12:00', room: 'Respiratory Clinic 210' }
    ],
    bio: {
      id: 'Mendalami tes kapasitas paru, pemulihan fungsi paru pasca infeksi pernapasan berat, serta penatalaksanaan alergi pernapasan perkotaan.',
      en: 'Dedicated to pulmonary function rehabilitation, post pneumonia recovery, and occupational lung disorders.'
    }
  },
  {
    id: 'doc-budi',
    name: 'dr. Budi Siregar, Sp.M',
    specialtyId: 'poli-mata',
    specialtyName: { id: 'Spesialis Mata (Oftalmologi)', en: 'Ophthalmology Specialist' },
    subSpecialty: { id: 'Katarak & Bedah Refraktif', en: 'Cataract & Refractive Surgery' },
    degree: 'Sp.M (FK USU)',
    experienceYears: 15,
    almamater: 'Universitas Sumatera Utara',
    strNumber: 'STR 12.10.1.1.2012.33201',
    rating: 4.91,
    reviewCount: 198,
    availableToday: false,
    floorNumber: 'Lt 2 (North Wing)',
    avatar: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'Batak Angkola', 'English'],
    schedules: [
      { day: 'Senin', startTime: '14:00', endTime: '18:00', room: 'Eye Center 204, North Wing' },
      { day: 'Rabu', startTime: '14:00', endTime: '18:00', room: 'Eye Center 204, North Wing' },
      { day: 'Jumat', startTime: '14:00', endTime: '18:00', room: 'Eye Center 204, North Wing' }
    ],
    bio: {
      id: 'Telah melakukan lebih dari 3.000 tindakan operasi katarak fakoemulsifikasi dengan teknik sayatan tanpa jahitan dan lensa premium multifokal.',
      en: 'Has performed over 3,000 sutureless phacoemulsification surgeries with premium multifocal intraocular lens implants.'
    }
  },
  {
    id: 'doc-hendra',
    name: 'dr. Hendra Ginting, Sp.THT, BKL',
    specialtyId: 'poli-tht',
    specialtyName: { id: 'Spesialis Telinga Hidung Tenggorok, Bedah Kepala Leher', en: 'Otolaryngology Head & Neck Surgery' },
    subSpecialty: { id: 'Rinologi & Bedah Sinus Endoskopi (FESS)', en: 'Rhinology & Endoscopic Sinus Surgery' },
    degree: 'Sp.THT, BKL (FK USU)',
    experienceYears: 14,
    almamater: 'Universitas Sumatera Utara',
    strNumber: 'STR 12.11.1.1.2013.88410',
    rating: 4.89,
    reviewCount: 152,
    availableToday: true,
    floorNumber: 'Lt 2 (North Wing)',
    avatar: 'https://images.unsplash.com/photo-1622253694242-abeb37a33e97?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'Karo', 'English'],
    schedules: [
      { day: 'Senin', startTime: '09:00', endTime: '13:00', room: 'ENT Clinic 206, North Wing' },
      { day: 'Rabu', startTime: '09:00', endTime: '13:00', room: 'ENT Clinic 206, North Wing' },
      { day: 'Kamis', startTime: '14:00', endTime: '18:00', room: 'ENT Clinic 206, North Wing' }
    ],
    bio: {
      id: 'Spesialis THT dengan keahlian bedah sinus invasif minimal, ekstraksi polip hidung tanpa luka luar, serta gangguan pendengaran dan vertigo.',
      en: 'ENT surgeon with high focus on minimally invasive functional endoscopic sinus surgery (FESS) and vestibular dizziness disorders.'
    }
  },
  {
    id: 'doc-rahmatia',
    name: 'dr. Rahmatia Nasution, Sp.Onk.Rad',
    specialtyId: 'poli-onkologi',
    specialtyName: { id: 'Spesialis Onkologi Radiasi', en: 'Radiation Oncology Specialist' },
    subSpecialty: { id: 'Terapi Radiasi Presisi & Brachytherapy', en: 'Precision Radiation & Brachytherapy' },
    degree: 'Sp.Onk.Rad (FK UI / Fellow Seoul)',
    experienceYears: 17,
    almamater: 'Universitas Indonesia & Asan Medical Center Seoul',
    strNumber: 'STR 12.12.3.2.2010.99015',
    rating: 4.97,
    reviewCount: 210,
    availableToday: true,
    floorNumber: 'Lt 5 (Pusat Kemoterapi)',
    avatar: 'https://images.unsplash.com/photo-1594824813572-c51375d7b5b5?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'Mandailing', 'English'],
    schedules: [
      { day: 'Senin', startTime: '10:00', endTime: '15:00', room: 'Oncology Center 505' },
      { day: 'Selasa', startTime: '10:00', endTime: '15:00', room: 'Oncology Center 505' },
      { day: 'Kamis', startTime: '10:00', endTime: '15:00', room: 'Oncology Center 505' }
    ],
    bio: {
      id: 'Ketua Tim Penanganan Tumor Medistra Horizon. Memperjuangkan terapi radiasi modern bertarget tinggi guna meminimalkan efek samping pada organ sehat.',
      en: 'Director of the Tumor Board at Medistra Horizon. Focuses on high precision stereotactic body radiation and compassionate patient journeys.'
    }
  },
  {
    id: 'doc-aisyah',
    name: 'dr. Aisyah Putri Batubara, Sp.A(K)',
    specialtyId: 'poli-anak',
    specialtyName: { id: 'Konsultan Alergi & Imunologi Anak', en: 'Pediatric Allergy & Immunology Consultant' },
    subSpecialty: { id: 'Alergi Makanan & Asma Anak', en: 'Pediatric Food Allergy & Asthma' },
    degree: 'Sp.A(K), M.Ked(Ped) (FK USU)',
    experienceYears: 15,
    almamater: 'Universitas Sumatera Utara',
    strNumber: 'STR 12.13.2.2.2012.77124',
    rating: 4.93,
    reviewCount: 189,
    availableToday: true,
    floorNumber: 'Lt 1 (North Wing)',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'Mandailing', 'English'],
    schedules: [
      { day: 'Selasa', startTime: '14:00', endTime: '18:00', room: 'Pediatric Sub Clinic 103' },
      { day: 'Kamis', startTime: '14:00', endTime: '18:00', room: 'Pediatric Sub Clinic 103' },
      { day: 'Sabtu', startTime: '13:00', endTime: '16:00', room: 'Pediatric Sub Clinic 103' }
    ],
    bio: {
      id: 'Ahli penanganan alergi susu sapi, eksim atopik pada bayi, desensitisasi makanan, dan pencegahan asma bronkial pada anak.',
      en: 'Leading authority on pediatric food anaphylaxis, cow milk protein allergy, and pediatric immunotherapy.'
    }
  },
  {
    id: 'doc-surya',
    name: 'dr. Surya',
    specialtyId: 'poli-umum',
    specialtyName: { id: 'Dokter Umum & Kepala Triage Rawat Jalan', en: 'General Practitioner & Outpatient Triage Head' },
    degree: 'dr. (FK USU)',
    experienceYears: 7,
    almamater: 'Universitas Sumatera Utara',
    strNumber: 'STR 12.14.1.1.2020.12345',
    rating: 4.85,
    reviewCount: 96,
    availableToday: true,
    floorNumber: 'Lt 1 (North Wing)',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    languages: ['Indonesia', 'English'],
    schedules: [
      { day: 'Senin', startTime: '08:00', endTime: '16:00', room: 'Poli Umum 100' },
      { day: 'Selasa', startTime: '08:00', endTime: '16:00', room: 'Poli Umum 100' },
      { day: 'Rabu', startTime: '08:00', endTime: '16:00', room: 'Poli Umum 100' },
      { day: 'Kamis', startTime: '08:00', endTime: '16:00', room: 'Poli Umum 100' },
      { day: 'Jumat', startTime: '08:00', endTime: '16:00', room: 'Poli Umum 100' }
    ],
    bio: {
      id: 'Dokter umum yang cekatan, ramah, dan teliti dalam skrining keluhan klinis awal serta perujukan tepat sasaran ke dokter spesialis.',
      en: 'Prompt, meticulous GP providing primary consultations and accurate specialty referrals.'
    }
  }
];

export const mockAmbulances: AmbulanceTracker[] = [
  {
    id: 'amb-01',
    code: 'UNIT ALPHA 01',
    driverName: 'Zulkifli Nasution',
    paramedicName: 'Ns. Hendro Simanjuntak, S.Kep',
    patientCallLocation: 'Jl. Gatot Subroto No. 88, Medan Petisah',
    currentStreet: 'Jl. Kapten Maulana Lubis (Dekat Lapangan Merdeka)',
    etaMinutes: 6,
    distanceKm: 2.4,
    status: 'responding',
    lastCoordinates: {
      lat: 3.5952,
      lng: 98.6722
    }
  },
  {
    id: 'amb-02',
    code: 'UNIT BRAVO 02 (ICU Mobile)',
    driverName: 'Rahmat Hidayat',
    paramedicName: 'Ns. Dian Novita, S.Kep (Advance Life Support)',
    patientCallLocation: 'Jl. Setia Budi Pasar 2, Medan Sunggal',
    currentStreet: 'Jl. Dr. Mansyur (Depan Kampus USU)',
    etaMinutes: 11,
    distanceKm: 4.8,
    status: 'en_route_to_patient',
    lastCoordinates: {
      lat: 3.5651,
      lng: 98.6543
    }
  },
  {
    id: 'amb-03',
    code: 'UNIT CHARLIE 03',
    driverName: 'Bambang Sembiring',
    paramedicName: 'Ns. Teguh Wardana',
    patientCallLocation: 'Pangkalan Siaga RS Medistra Horizon',
    currentStreet: 'Lobby UGD Lt Ground, North Wing',
    etaMinutes: 0,
    distanceKm: 0,
    status: 'standby',
    lastCoordinates: {
      lat: 3.5852,
      lng: 98.6688
    }
  }
];
