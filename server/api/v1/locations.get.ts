import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return [
    {
      id: 1,
      company_id: 1,
      uuid: 'loc-uuid-1111',
      name: 'Connaught Place Branch',
      google_maps_url: 'https://maps.google.com/?cid=1111',
      justdial_url: 'https://www.justdial.com/Delhi/1111',
      sulekha_url: 'https://www.sulekha.com/delhi/1111',
      makemytrip_url: 'https://www.makemytrip.com/hotels/1111',
      is_active: true,
      qr_code: { id: 101, uuid: 'qr-uuid-1111', scan_count: 320 }
    },
    {
      id: 2,
      company_id: 1,
      uuid: 'loc-uuid-2222',
      name: 'Indiranagar Outlet',
      google_maps_url: 'https://maps.google.com/?cid=2222',
      justdial_url: 'https://www.justdial.com/Bangalore/2222',
      sulekha_url: null,
      makemytrip_url: null,
      is_active: true,
      qr_code: { id: 102, uuid: 'qr-uuid-2222', scan_count: 154 }
    },
    {
      id: 3,
      company_id: 1,
      uuid: 'loc-uuid-3333',
      name: 'Bandra West Lounge',
      google_maps_url: 'https://maps.google.com/?cid=3333',
      justdial_url: null,
      sulekha_url: 'https://www.sulekha.com/mumbai/3333',
      makemytrip_url: 'https://www.makemytrip.com/hotels/3333',
      is_active: true,
      qr_code: { id: 103, uuid: 'qr-uuid-3333', scan_count: 89 }
    },
    {
      id: 4,
      company_id: 1,
      uuid: 'loc-uuid-4444',
      name: 'Jubilee Hills Dine-in',
      google_maps_url: 'https://maps.google.com/?cid=4444',
      justdial_url: 'https://www.justdial.com/Hyderabad/4444',
      sulekha_url: null,
      makemytrip_url: null,
      is_active: true,
      qr_code: { id: 104, uuid: 'qr-uuid-4444', scan_count: 215 }
    },
    {
      id: 5,
      company_id: 1,
      uuid: 'loc-uuid-5555',
      name: 'Koregaon Park Bistro',
      google_maps_url: 'https://maps.google.com/?cid=5555',
      justdial_url: 'https://www.justdial.com/Pune/5555',
      sulekha_url: null,
      makemytrip_url: null,
      is_active: true,
      qr_code: { id: 105, uuid: 'qr-uuid-5555', scan_count: 110 }
    },
    {
      id: 6,
      company_id: 1,
      uuid: 'loc-uuid-6666',
      name: 'Nungambakkam Express',
      google_maps_url: 'https://maps.google.com/?cid=6666',
      justdial_url: null,
      sulekha_url: 'https://www.sulekha.com/chennai/6666',
      makemytrip_url: null,
      is_active: true,
      qr_code: { id: 106, uuid: 'qr-uuid-6666', scan_count: 67 }
    },
    {
      id: 7,
      company_id: 1,
      uuid: 'loc-uuid-7777',
      name: 'DLF CyberHub Spot',
      google_maps_url: 'https://maps.google.com/?cid=7777',
      justdial_url: 'https://www.justdial.com/Gurgaon/7777',
      sulekha_url: null,
      makemytrip_url: 'https://www.makemytrip.com/hotels/7777',
      is_active: true,
      qr_code: { id: 107, uuid: 'qr-uuid-7777', scan_count: 423 }
    }
  ]
})
