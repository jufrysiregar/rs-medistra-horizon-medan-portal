import type { StaticImageData } from 'next/image';

/*
 * SATU-SATUNYA JEMBATAN id dokter <-> foto lokal.
 *
 * Kenapa tidak langsung ditulis di dokter.json / mockData.ts? Dua sumber data itu
 * murni JSON/objek, sementara file di src/images/ wajib di-import statis supaya
 * Next menghasilkan URL bertanda-hash (sama seperti pola HERO_IMAGES di
 * lib/facilityUnit.ts). Jadi filenya di-import di sini, lalu komponennya minta
 * lewat fotoDokter(id, fallback).
 *
 * Kunci = `id` yang sama dipakai dokter.json (doc-*). Nama file foto mengikuti
 * NAMA LENGKAP dokternya, tanpa gelar (mis. Ahmad Fauzi -> Ahmad-Fauzi.jpg),
 * jadi menambah dokter baru = taruh jpg-nya lalu tambah satu baris impor + satu
 * baris peta di bawah.
 *
 * Yang di-import adalah file ASLI dari src/images/dokter/ - tidak ada folder atau
 * skrip pra-olah lagi. Ukuran yang benar-benar dikirim ke browser diatur lewat
 * next/image di komponen: Next mengecilkan + mengkonversi ke WebP saat runtime lewat
 * /_next/image, jadi foto 2 MB tidak pernah turun utuh ke halaman.
 */
import fotoAhmadFauzi from '../images/dokter/Ahmad-Fauzi.jpg';
import fotoDrSurya from '../images/dokter/dr-surya.jpg';
import fotoDimasAryoWibowo from '../images/dokter/Dimas-Aryo-Wibowo.jpg';
import fotoKevinWijaya from '../images/dokter/Kevin-Wijaya.jpg';
import fotoAndiSaputra from '../images/dokter/Andi-Saputra.jpg';
import fotoBellaAnjani from '../images/dokter/Bella-Anjani.jpg';
import fotoCandraWijaya from '../images/dokter/Candra-Wijaya.jpg';
import fotoDewiSartika from '../images/dokter/Dewi-Sartika.jpg';
import fotoEkoPrasetyo from '../images/dokter/Eko-Prasetyo.jpg';
import fotoFransiskaLumbanGaol from '../images/dokter/Fransiska-Lumban-Gaol.jpg';
import fotoGilangRamadhan from '../images/dokter/Gilang-Ramadhan.jpg';
import fotoIndahPermataSari from '../images/dokter/Indah-Permata-Sari.jpg';
import fotoJokoSusilo from '../images/dokter/Joko-Susilo.jpg';
import fotoKartikaSari from '../images/dokter/Kartika-Sari.jpg';
import fotoLukmanHakim from '../images/dokter/Lukman-Hakim.jpg';
import fotoMegaWati from '../images/dokter/Mega-Wati.jpg';
import fotoNicoFernando from '../images/dokter/Nico-Fernando.jpg';
import fotoOkiSetiana from '../images/dokter/Oki-Setiana.jpg';
import fotoPutraPratama from '../images/dokter/Putra-Pratama.jpg';
import fotoQoriAmanda from '../images/dokter/Qori-Amanda.jpg';
import fotoRezaRahardian from '../images/dokter/Reza-Rahardian.jpg';
import fotoSarahLubis from '../images/dokter/Sarah-Lubis.jpg';
import fotoRizkyRamadanHarahap from '../images/dokter/Rizky-Ramadan-Harahap.jpg';
import fotoFaisalDaulay from '../images/dokter/Faisal-Daulay.jpg';
import fotoAgungHermansyahManullang from '../images/dokter/Agung-Hermansyah-Manullang.jpg';
import fotoChristopherTan from '../images/dokter/Christopher-Tan.jpg';
import fotoZulhamEffendi from '../images/dokter/Zulham-Effendi.jpg';
import fotoJonathanSitumorang from '../images/dokter/Jonathan-Situmorang.jpg';
import fotoTengkuAhmadFaisal from '../images/dokter/Tengku-Ahmad-Faisal.jpg';
import fotoRatnaDewi from '../images/dokter/Ratna-Dewi.jpg';
import fotoAnggi from '../images/dokter/Anggi.jpg';
import fotoGraceNataliaLumbantobing from '../images/dokter/Grace-Natalia-Lumbantobing.jpg';
import fotoAisyahPutriBatubara from '../images/dokter/Aisyah-Putri-Batubara.jpg';
import fotoMiftahPutra from '../images/dokter/Miftah-Putra.jpg';
import fotoSitiRahmawati from '../images/dokter/Siti-Rahmawati.jpg';
import fotoRianHidayat from '../images/dokter/Rian-Hidayat.jpg';
import fotoBudiSiregar from '../images/dokter/Budi-Siregar.jpg';
import fotoAdityaPratama from '../images/dokter/Aditya-Pratama.jpg';
import fotoMariaFransiskaSirait from '../images/dokter/Maria-Fransiska-Sirait.jpg';
import fotoBayuAditya from '../images/dokter/Bayu-Aditya.jpg';
import fotoMayaFitrianiKaroKaro from '../images/dokter/Maya-Fitriani-Karo-karo.jpg';
import fotoFeliciaSutanto from '../images/dokter/Felicia-Sutanto.jpg';
import fotoHendraGinting from '../images/dokter/Hendra-Ginting.jpg';
import fotoZakiAbdullah from '../images/dokter/Zaki-Abdullah.jpg';
import fotoIntanPermatasari from '../images/dokter/Intan-Permatasari.jpg';
import fotoBudiSantoso from '../images/dokter/Budi-Santoso.jpg';
import fotoRahmatHidayat from '../images/dokter/Rahmat-Hidayat.jpg';
import fotoBagoesSuryo from '../images/dokter/Bagoes-Suryo.jpg';
import fotoRahmatiaNasution from '../images/dokter/Rahmatia-Nasution.jpg';
import fotoAhmadDani from '../images/dokter/Ahmad-Dani.jpg';
import fotoRudiHartonoTanjung from '../images/dokter/Rudi-Hartono-Tanjung.jpg';
import fotoDavidLumenta from '../images/dokter/David-Lumenta.jpg';
import fotoFitriHandayani from '../images/dokter/Fitri-Handayani.jpg';
import fotoRinaAmelia from '../images/dokter/Rina-Amelia.jpg';
import fotoNadiaSalsabila from '../images/dokter/Nadia-Salsabila.jpg';
import fotoWilliamTan from '../images/dokter/William-Tan.jpg';
import fotoBudiartoHalim from '../images/dokter/Budiarto-Halim.jpg';
import fotoSiskaLestari from '../images/dokter/Siska-Lestari.jpg';
import fotoHendrawan from '../images/dokter/Hendrawan.jpg';
import fotoMelatiPutri from '../images/dokter/Melati-Putri.jpg';

const FOTO: Record<string, StaticImageData> = {
  'doc-ahmad': fotoAhmadFauzi, // dr. Ahmad Fauzi, Sp.PD-KKV
  'doc-surya': fotoDrSurya, // dr. Surya
  'doc-dimas': fotoDimasAryoWibowo, // dr. Dimas Aryo Wibowo, Sp.B
  'doc-kevin': fotoKevinWijaya, // dr. Kevin Wijaya
  'doc-andi': fotoAndiSaputra, // dr. Andi Saputra
  'doc-bella': fotoBellaAnjani, // dr. Bella Anjani
  'doc-candra': fotoCandraWijaya, // dr. Candra Wijaya
  'doc-dewi': fotoDewiSartika, // dr. Dewi Sartika
  'doc-eko': fotoEkoPrasetyo, // dr. Eko Prasetyo
  'doc-fransiska': fotoFransiskaLumbanGaol, // dr. Fransiska Lumban Gaol
  'doc-gilang': fotoGilangRamadhan, // dr. Gilang Ramadhan
  'doc-indah': fotoIndahPermataSari, // dr. Indah Permata Sari
  'doc-joko': fotoJokoSusilo, // dr. Joko Susilo
  'doc-kartika': fotoKartikaSari, // dr. Kartika Sari
  'doc-lukman': fotoLukmanHakim, // dr. Lukman Hakim
  'doc-mega': fotoMegaWati, // dr. Mega Wati
  'doc-nico': fotoNicoFernando, // dr. Nico Fernando
  'doc-oki': fotoOkiSetiana, // dr. Oki Setiana
  'doc-putra': fotoPutraPratama, // dr. Putra Pratama
  'doc-qori': fotoQoriAmanda, // dr. Qori Amanda
  'doc-reza': fotoRezaRahardian, // dr. Reza Rahardian
  'doc-sarah': fotoSarahLubis, // dr. Sarah Lubis, Sp.JP
  'doc-rizky': fotoRizkyRamadanHarahap, // dr. Rizky Ramadan Harahap, Sp.S
  'doc-faisal': fotoFaisalDaulay, // dr. Faisal Daulay, Sp.P
  'doc-agung': fotoAgungHermansyahManullang, // dr. Agung Hermansyah Manullang, Sp.OT
  'doc-christopher': fotoChristopherTan, // dr. Christopher Tan, Sp.An
  'doc-zulham': fotoZulhamEffendi, // dr. Zulham Effendi, Sp.Rad
  'doc-jonathan': fotoJonathanSitumorang, // dr. Jonathan Situmorang, Sp.PD
  'doc-tengku': fotoTengkuAhmadFaisal, // dr. Tengku Ahmad Faisal, Sp.PD
  'doc-ratna': fotoRatnaDewi, // dr. Ratna Dewi, Sp.PD
  'doc-anggi': fotoAnggi, // dr. Anggi, Sp.A
  'doc-grace': fotoGraceNataliaLumbantobing, // dr. Grace Natalia Lumbantobing, Sp.A
  'doc-aisyah': fotoAisyahPutriBatubara, // dr. Aisyah Putri Batubara, Sp.A(K)
  'doc-miftah': fotoMiftahPutra, // dr. Miftah Putra, Sp.OG
  'doc-siti': fotoSitiRahmawati, // dr. Siti Rahmawati, Sp.OG
  'doc-rian': fotoRianHidayat, // dr. Rian Hidayat, Sp.OG
  'doc-budi': fotoBudiSiregar, // dr. Budi Siregar, Sp.B
  'doc-aditya': fotoAdityaPratama, // dr. Aditya Pratama, Sp.B
  'doc-maria': fotoMariaFransiskaSirait, // dr. Maria Fransiska Sirait, Sp.PK
  'doc-bayu': fotoBayuAditya, // dr. Bayu Aditya, Sp.PA
  'doc-maya': fotoMayaFitrianiKaroKaro, // dr. Maya Fitriani Karo-karo, Sp.DVE
  'doc-felicia': fotoFeliciaSutanto, // dr. Felicia Sutanto, Sp.DVE
  'doc-hendra': fotoHendraGinting, // dr. Hendra Ginting, Sp.THT-KL
  'doc-zaki': fotoZakiAbdullah, // dr. Zaki Abdullah, Sp.THT-KL
  'doc-intan': fotoIntanPermatasari, // dr. Intan Permatasari, Sp.M
  'doc-budisantoso': fotoBudiSantoso, // dr. Budi Santoso, Sp.M
  'doc-rahmathidayat': fotoRahmatHidayat, // dr. Rahmat Hidayat, Sp.U
  'doc-bagoes': fotoBagoesSuryo, // dr. Bagoes Suryo, Sp.U
  'doc-rahmatia': fotoRahmatiaNasution, // dr. Rahmatia Nasution, Sp.KJ
  'doc-dani': fotoAhmadDani, // dr. Ahmad Dani, Sp.KJ
  'doc-rudi': fotoRudiHartonoTanjung, // dr. Rudi Hartono Tanjung, Sp.BS
  'doc-david': fotoDavidLumenta, // dr. David Lumenta, Sp.BP-RE
  'doc-fitri': fotoFitriHandayani, // dr. Fitri Handayani, Sp.KFR
  'doc-rina': fotoRinaAmelia, // dr. Rina Amelia, Sp.KFR
  'doc-nadia': fotoNadiaSalsabila, // dr. Nadia Salsabila, Sp.GK
  'doc-william': fotoWilliamTan, // dr. William Tan, Sp.Onk.Rad
  'doc-budiarto': fotoBudiartoHalim, // drg. Budiarto Halim
  'doc-siska': fotoSiskaLestari, // drg. Siska Lestari
  'doc-hendrawijaya': fotoHendrawan, // drg. Hendrawan, Sp.KG
  'doc-melati': fotoMelatiPutri, // drg. Melati Putri, Sp.BM
};

/**
 * Foto lokal untuk seorang dokter: dikembalikan sebagai objek impor Next supaya
 * komponennya bisa menyerahkannya ke <Image> dan dioptimalkan saat runtime. Kalau
 * id-nya belum terdaftar (mis. dokter baru yang fotonya belum ada), `fallback`
 * (URL jarak jauh) dipakai apa adanya supaya kartu tidak pernah kosong.
 */
export const fotoDokter = (id: string, fallback = ''): StaticImageData | string =>
  FOTO[id] ?? fallback;
