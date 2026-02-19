export const pricingQuery = `*[_type == "pricing"] {
  planId,
  planName,
  category,
  price,
  features[] {
    text,
    included
  }
}`;

export const customPlansQuery = `*[_type == "customPlan"] | order(price asc) {
  planId,
  title,
  price,
  description
}`;

export const postsQuery = `*[_type == "blog"] | order(date desc) {
  title,
  slug,
  excerpt,
  date,
  category,
  content
}`;
