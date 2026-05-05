import { useState } from 'react';

export const useHomeVM = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCity, setSelectedCity] = useState('All City');
  const [search, setSearch] = useState('');

  const malls = [
    {
      name: 'Trans Studio Mall',
      city: 'Makassar',
      image: require('../assets/images/TransStudioMall.jpg'),
      address:'Jl. Metro Tj. Bunga, Maccini Sombala, Kota Makassar',
    },

    {
      name: 'Phinisi Point Mall',
      city: 'Makassar',
      image: require('../assets/images/PhinisiPointMall.jpg'),
      address:'Jl. Metro Tj. Bunga No.2, Kota Makassar',
    },

    {
      name: 'Manado Town Square',
      city: 'Manado',
      image: require('../assets/images/ManadoTownSquare.jpeg'),
      address:'Jl. Piere Tendean, Kota Manado',
    },

    {
      name: 'Palu Grand Mall',
      city: 'Palu',
      image: require('../assets/images/PaluGrandMall.jpeg'),
      address:'Jl. Diponegoro, Kota Palu',
    },

    {
      name: 'The Park Kendari',
      city: 'Kendari',
      image: require('../assets/images/TheParkKendari.jpg'),
      address:'Jalan Brigjen M. Yoenoes, Bende, Kadia, Kendari',
    },

    {
      name: 'Citimall Gorontalo',
      city: 'Gorontalo',
      image: require('../assets/images/CitimallGorontalo.jpg'),
      address:'Jl. Sultan Botutihe No.68, Heledula Sel., Kec. Kota Tim., Kota Gorontalo',
    },

    {
      name: 'Megah Plaza Palopo',
      city: 'Palopo',
      image: require('../assets/images/MegahPlazaPalopo.jpg'),
      address:'Jl. KH. Ahmad Dahlan No.38 Lt.3, Amasangan, Kec. Wara, Kota Palopo, Sulawesi Selatan',
    },
    { 
      name: 'Mall Ratu Indah', 
      city : 'Makassar', 
      image: require('../assets/images/MallRatuIndah.webp'), 
      address: 'Jl. DR. Ratulangi No.10, Mangkura, Kec. Mamajang, Kota Makassar, Sulawesi Selatan 90113', 
    },
    { 
      name: 'Mega Mall Manado', 
      city : 'Manado', 
      image: require('../assets/images/MegaMallManado.jpg'), 
      address: 'Kawasan Mega mas, Jl. Piere Tendean, Wenang Sel., Kec. Wenang, Kota Manado, Sulawesi Utara', 
    },
    { 
      name: 'Mall Ramayana Palu', 
      city : 'Palu', 
      image: require('../assets/images/MallRamayanaPalu.jpg'), 
      address: 'Jl. Sudirman, Besusu Bar., Kec. Palu Sel., Kota Palu, Sulawesi Tengah',
    },
    { 
      name: 'Lipo Plaza Kendari', 
      city : 'Kendari', 
      image: require('../assets/images/LipoPlazaKendari.webp'), 
      address: 'Jl. Jenderal M.t. Haryono No.61 - 63, Bende, Kec. Kadia, Kota Kendar, Sulawesi Tenggara',
    },
    { 
      name: 'Lipo Plaza Manado', 
      city : 'Manado', 
      image: require('../assets/images/LippoPlazaManado.webp'), 
      address: 'Jl. A.A. Maramis, Kairagi Dua, Kec. Mapanget, Kota Manado, Sulawesi Utara', 
    },
    { 
      name: 'Mall Panakkukang', 
      city : 'Makassar', 
      image: require('../assets/images/MallPanakkukang.jpg'), 
      address: 'Jl. Boulevard No.3, Masale, Kec. Panakkukang, Kota Makassar, Sulawesi Selatan 90231', 
    },
    { 
      name: 'Nipah Mall', 
      city : 'Makassar', 
      image: require('../assets/images/NipahMall.jpeg'), 
      address: 'Jl. Urip Sumoharjo No.23C, Panaikang, Kec. Panakkukang, Kota Makassar, Sulawesi Selatan 90231', 
    },
    { 
      name: 'Makassar Town Square', 
      city : 'Makassar', 
      image: require('../assets/images/MakassarTownSquare.jpg'), 
      address: 'Jl. Perintis Kemerdekaan No.26, Tamalanrea Jaya, Tamalanrea, Makassar City, South Sulawesi 90245', 
    },
  ];

  // FILTER + SEARCH
  const filteredMall = malls.filter((mall) => {
    const matchCity =
      selectedCity === 'All City' ||
      mall.city === selectedCity;

    const matchSearch =
      mall.name
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchCity && matchSearch;
  });

  return {
    showFilter,
    setShowFilter,

    selectedCity,
    setSelectedCity,

    search,
    setSearch,

    filteredMall,
  };
};