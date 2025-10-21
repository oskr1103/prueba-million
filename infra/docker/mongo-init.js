db = db.getSiblingDB('million');

db.properties.insertMany([
  {
    idOwner: new ObjectId(),
    name: 'Casa moderna en zona residencial',
    addressProperty: 'Av. Principal 123, Bogotá',
    priceProperty: 3500000,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'
  },
  {
    idOwner: new ObjectId(),
    name: 'Departamento céntrico con vista panorámica',
    addressProperty: 'Calle Centro 456, Medellín',
    priceProperty: 2800000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'
  },
  {
    idOwner: new ObjectId(),
    name: 'Casa de campo con amplio terreno',
    addressProperty: 'Camino Rural 789, Cali',
    priceProperty: 4200000,
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800'
  },
  {
    idOwner: new ObjectId(),
    name: 'Loft moderno en el corazón de la ciudad',
    addressProperty: 'Av. Reforma 321, Bogotá',
    priceProperty: 1950000,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
  },
  {
    idOwner: new ObjectId(),
    name: 'Villa con alberca y jardín',
    addressProperty: 'Fraccionamiento Privado 654, Cancún',
    priceProperty: 6500000,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
  },
  {
    idOwner: new ObjectId(),
    name: 'Penthouse de lujo con terraza',
    addressProperty: 'Torre Ejecutiva 987, Barranquilla',
    priceProperty: 5200000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
  },
  {
    idOwner: new ObjectId(),
    name: 'Casa en condominio familiar',
    addressProperty: 'Residencial Los Pinos 147, Querétaro',
    priceProperty: 2600000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
  },
  {
    idOwner: new ObjectId(),
    name: 'Departamento con acabados de lujo',
    addressProperty: 'Zona Dorada 258, Tijuana',
    priceProperty: 3100000,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
  },
  {
    idOwner: new ObjectId(),
    name: 'Casa estilo colonial restaurada',
    addressProperty: 'Centro Histórico 369, Guanajuato',
    priceProperty: 3800000,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800'
  },
  {
    idOwner: new ObjectId(),
    name: 'Residencia minimalista de diseñador',
    addressProperty: 'Fraccionamiento Premium 741, Mérida',
    priceProperty: 4500000,
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800'
  },
  {
    idOwner: new ObjectId(),
    name: 'Casa frente al mar',
    addressProperty: 'Zona Hotelera 852, Playa del Carmen',
    priceProperty: 7800000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
  },
  {
    idOwner: new ObjectId(),
    name: 'Departamento ejecutivo amueblado',
    addressProperty: 'Polanco 963, Bogotá',
    priceProperty: 4100000,
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800'
  }
]);

db.properties.createIndex({ name: 1, addressProperty: 1, priceProperty: 1 });

print('Database initialized with sample properties');

