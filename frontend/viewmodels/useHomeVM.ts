import { useState } from 'react';

export const useHomeVM = () => {

  const [search, setSearch] = useState('');

  const parkingPlaces = [

    {
      name: 'Ground Floor',
      image: require('../assets/images/G.jpg'),
      description:
        'Area parkir dasar yang berada dekat akses masuk utama mall. Memiliki akses langsung ke lobby mall serta lift utama pengunjung.',
    },

    {
      name: 'Ground Floor - Area A',
      image: require('../assets/images/GA.jpg'),
      description:
        'Zona parkir transisi setelah Ground Floor dengan posisi setengah lantai di atas area G.',
    },

    {
      name: 'Lantai P1',
      image: require('../assets/images/P1.jpg'),
      description:
        'Area parkir utama yang memiliki akses langsung ke dalam mall serta terhubung dengan lift utama pengunjung.',
    },

    {
      name: 'Lantai P1 - Area A',
      image: require('../assets/images/P1A.jpg'),
      description:
        'Zona parkir tambahan setelah area P1 dengan posisi setengah lantai lebih tinggi.',
    },

    {
      name: 'Lantai P2',
      image: require('../assets/images/P2.jpg'),
      description:
        'Area parkir lantai 2 yang terhubung dengan lift utama.',
    },

    {
      name: 'Lantai P2 - Area A',
      image: require('../assets/images/P2A.jpg'),
      description:
        'Zona parkir tambahan setelah area P2 dengan kondisi parkiran lebih longgar.',
    },

    {
      name: 'Lantai P3',
      image: require('../assets/images/P3.jpg'),
      description:
        'Area parkir utama lantai 3 dengan akses lift menuju lantai mall.',
    },

    {
      name: 'Lantai P3 - Area A',
      image: require('../assets/images/P3A.jpg'),
      description:
        'Zona parkir split-level setelah P3 dengan kondisi parkiran lebih tenang.',
    },

    {
      name: 'Lantai P4',
      image: require('../assets/images/P4.jpg'),
      description:
        'Area parkir utama dekat lift dengan suasana lebih tenang.',
    },

    {
      name: 'Lantai P4 - Area A',
      image: require('../assets/images/P4A.jpg'),
      description:
        'Zona tambahan setelah P4 dengan akses kendaraan lebih lancar.',
    },

    {
      name: 'Lantai P5',
      image: require('../assets/images/P5.jpg'),
      description:
        'Area parkir paling atas dengan akses lift menuju lantai utama mall.',
    },
  ];

  // SEARCH
  const filteredParking = parkingPlaces.filter((place) =>
    place.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return {
    search,
    setSearch,

    filteredParking,
  };
};