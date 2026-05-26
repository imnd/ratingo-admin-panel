import { d as defineEventHandler, k as getQuery } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const mockFeedbackDb = [
  {
    id: 1,
    location_id: 1,
    rating: 2,
    name: "Rahul Sharma",
    phone: "919876543210",
    feedback_text: "The service was extremely slow. We had to wait for 45 minutes just to get our starters. The staff at Connaught Place seemed completely indifferent to our requests.",
    created_at: "2026-05-25T12:44:00.000Z"
  },
  {
    id: 2,
    location_id: 1,
    rating: 1,
    name: "Priya Patel",
    phone: "919123456789",
    feedback_text: "Food was cold, waiter was extremely rude when we pointed it out. They charged us service tax even though we asked them to remove it. Never coming back!",
    created_at: "2026-05-24T08:40:00.000Z"
  },
  {
    id: 3,
    location_id: 2,
    rating: 2,
    name: "Ananya Iyer",
    phone: "919000111222",
    feedback_text: "The Butter Chicken was way too sweet and lacked any authentic flavor. The Indiranagar outlet is usually good, but today was a major disappointment.",
    created_at: "2026-05-25T14:10:00.000Z"
  },
  {
    id: 4,
    location_id: 3,
    rating: 3,
    name: "Vikram Singh",
    phone: "918888777766",
    feedback_text: "Ambience is great but they have extremely limited vegetarian options in Bandra. Also, the music was deafeningly loud, making it impossible to talk.",
    created_at: "2026-05-23T16:15:00.000Z"
  },
  {
    id: 5,
    location_id: 1,
    rating: 3,
    name: "Amit Verma",
    phone: "919999000011",
    feedback_text: "AC was not working properly in the family section. Food was average. They need to fix their ventilation system.",
    created_at: "2026-05-22T09:20:00.000Z"
  },
  {
    id: 6,
    location_id: 4,
    rating: 1,
    name: "Sneha Reddy",
    phone: "917777666655",
    feedback_text: "Found a hair in my Paneer Tikka! This is completely unacceptable hygiene-wise. The manager just offered a generic apology instead of waiving the bill.",
    created_at: "2026-05-25T11:05:00.000Z"
  },
  {
    id: 7,
    location_id: 2,
    rating: 2,
    name: "Rohan Das",
    phone: "919830098300",
    feedback_text: "Ordered via takeaway and they missed half the items. When I called, they told me to drive back to Indiranagar to pick it up myself. Shocking customer support.",
    created_at: "2026-05-24T17:35:00.000Z"
  },
  {
    id: 8,
    location_id: 5,
    rating: 3,
    name: "Meera Deshmukh",
    phone: "918765432109",
    feedback_text: "Valet parking took 30 minutes to get my car in Pune. The food is decent but the logistics here are a nightmare.",
    created_at: "2026-05-21T18:50:00.000Z"
  },
  {
    id: 9,
    location_id: 6,
    rating: 1,
    name: "Karthik Raja",
    phone: "919444094440",
    feedback_text: "Wait times at Chennai are ridiculous. Table booking through EazyDiner was ignored. Absolute waste of time.",
    created_at: "2026-05-25T13:00:00.000Z"
  },
  {
    id: 10,
    location_id: 7,
    rating: 2,
    name: "Pooja Hegde",
    phone: "919811122233",
    feedback_text: "The drinks were watered down. We ordered cocktails at CyberHub and they felt like mocktails. Food portions are too small for the price.",
    created_at: "2026-05-25T15:30:00.000Z"
  },
  {
    id: 11,
    location_id: 1,
    rating: 2,
    name: "Sanjay Dutt",
    phone: "919810012345",
    feedback_text: "Restrooms were extremely dirty. For a premium restaurant in Connaught Place, this level of hygiene is pathetic.",
    created_at: "2026-05-20T11:15:00.000Z"
  },
  {
    id: 12,
    location_id: 2,
    rating: 3,
    name: "Kiran Rao",
    phone: "919945099450",
    feedback_text: "Mutton was chewy and dry. Gravy was good but meat quality needs improvement.",
    created_at: "2026-05-20T19:40:00.000Z"
  },
  {
    id: 13,
    location_id: 3,
    rating: 1,
    name: "Deepak Padukone",
    phone: "919820098200",
    feedback_text: "Overpriced and hyped. Bandra location is tiny and cramped, felt like eating in a crowded local train. Food is completely average.",
    created_at: "2026-05-19T21:10:00.000Z"
  },
  {
    id: 14,
    location_id: 4,
    rating: 2,
    name: "Harish Rao",
    phone: "919848098480",
    feedback_text: "Briyani was cold when served. The spices felt raw. Hyderabad outlet needs better chefs.",
    created_at: "2026-05-18T13:20:00.000Z"
  },
  {
    id: 15,
    location_id: 5,
    rating: 2,
    name: "Aditi Joshi",
    phone: "919822098220",
    feedback_text: "No seating arrangements while waiting. We had to stand outside for 40 minutes with senior citizens. Hostess was unhelpful.",
    created_at: "2026-05-17T20:05:00.000Z"
  },
  {
    id: 16,
    location_id: 6,
    rating: 3,
    name: "Vijay Kumar",
    phone: "919444123456",
    feedback_text: "Decent food but they took too long to pack our leftovers. Bill had incorrect items added.",
    created_at: "2026-05-16T14:50:00.000Z"
  },
  {
    id: 17,
    location_id: 7,
    rating: 1,
    name: "Preeti Zinta",
    phone: "919812345678",
    feedback_text: "The Gurgaon branch has gone downhill. Soup was salty, noodles were greasy. The manager did not even bother to take feedback.",
    created_at: "2026-05-15T19:30:00.000Z"
  },
  {
    id: 18,
    location_id: 1,
    rating: 1,
    name: "Gaurav Chopra",
    phone: "919811098110",
    feedback_text: "Rude security guard at CP branch. Denied entry to my friend claiming some absurd dress code. Horrid management.",
    created_at: "2026-05-14T20:15:00.000Z"
  },
  {
    id: 19,
    location_id: 2,
    rating: 2,
    name: "Nikhil Gowda",
    phone: "919900199001",
    feedback_text: "Desserts were stale. The Rasmalai tasted sour. Clearly they are using old batches.",
    created_at: "2026-05-13T21:40:00.000Z"
  },
  {
    id: 20,
    location_id: 3,
    rating: 2,
    name: "Varun Dhawan",
    phone: "919821198211",
    feedback_text: "Extremely difficult to find parking near Bandra lounge. The food is fine but parking issues ruin the experience.",
    created_at: "2026-05-12T13:30:00.000Z"
  },
  {
    id: 21,
    location_id: 4,
    rating: 1,
    name: "Venkatesh Babu",
    phone: "919849098490",
    feedback_text: "Found bugs near the dining table! Absolute nightmare. Shut down this place immediately for pest control.",
    created_at: "2026-05-11T12:00:00.000Z"
  },
  {
    id: 22,
    location_id: 5,
    rating: 3,
    name: "Pradeep Kulkarni",
    phone: "919823098230",
    feedback_text: "Overall mediocre. Puneri taste is missing. Price is too high for this quantity.",
    created_at: "2026-05-10T19:00:00.000Z"
  },
  {
    id: 23,
    location_id: 6,
    rating: 1,
    name: "Subramanian Swamy",
    phone: "919445094450",
    feedback_text: "AC water was dripping directly onto our chairs. Staff did not care to clean it or change our table. Terrible.",
    created_at: "2026-05-09T20:30:00.000Z"
  },
  {
    id: 24,
    location_id: 7,
    rating: 2,
    name: "Ritu Phogat",
    phone: "919812233445",
    feedback_text: "Extremely noisy, could not even hear the server. The layout is very poorly planned.",
    created_at: "2026-05-08T18:00:00.000Z"
  },
  {
    id: 25,
    location_id: 1,
    rating: 2,
    name: "Karan Johar",
    phone: "919810101010",
    feedback_text: "Staff was pushy, trying to upsell expensive dishes repeatedly. Let us dine in peace!",
    created_at: "2026-05-07T21:00:00.000Z"
  }
];
const locationNames = {
  1: "Connaught Place Branch",
  2: "Indiranagar Outlet",
  3: "Bandra West Lounge",
  4: "Jubilee Hills Dine-in",
  5: "Koregaon Park Bistro",
  6: "Nungambakkam Express",
  7: "DLF CyberHub Spot"
};
const feedback_get = defineEventHandler((event) => {
  const query = getQuery(event);
  const locationId = query.location_id ? Number(query.location_id) : query.locationId ? Number(query.locationId) : null;
  const search = query.search ? query.search.toString().toLowerCase().trim() : "";
  const page = query.page ? Number(query.page) : 1;
  const limit = query.limit ? Number(query.limit) : 15;
  const dateFrom = query.date_from ? new Date(query.date_from.toString()) : null;
  const dateTo = query.date_to ? new Date(query.date_to.toString()) : null;
  let filtered = mockFeedbackDb;
  if (locationId !== null && locationId !== 0) {
    filtered = filtered.filter((item) => item.location_id === locationId);
  }
  if (search) {
    filtered = filtered.filter(
      (item) => (item.name || "").toLowerCase().includes(search) || (item.phone || "").includes(search) || (item.feedback_text || "").toLowerCase().includes(search)
    );
  }
  if (dateFrom) {
    filtered = filtered.filter((item) => new Date(item.created_at) >= dateFrom);
  }
  if (dateTo) {
    const toDate = new Date(dateTo);
    toDate.setHours(23, 59, 59, 999);
    filtered = filtered.filter((item) => new Date(item.created_at) <= toDate);
  }
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filtered.slice(startIndex, endIndex);
  const dataWithLocations = paginatedData.map((item) => ({
    ...item,
    uuid: `review-uuid-${item.id}`,
    location: {
      id: item.location_id,
      name: locationNames[item.location_id] || "Unknown Branch"
    }
  }));
  return {
    data: dataWithLocations,
    pagination: {
      total,
      page,
      limit,
      totalPages
    }
  };
});

export { feedback_get as default };
//# sourceMappingURL=feedback.get.mjs.map
