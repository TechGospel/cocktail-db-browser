#  Cocktail Search App

A React application for searching cocktails by ingredient, browsing results with pagination, and filtering by alcoholic content with efficient data fetching and caching.

## How to Run the Project

### Prerequisites

* Node.js **v18+**
* npm or yarn

### Steps

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

## Architecture Decisions

### 1. **Separation of Concerns**

* **Search results (`DrinkSummary`)** are stored separately from
* **Drink details (`DrinkDetail`)**, which are cached in a `detailsMap`

This avoids refetching details unnecessarily and keeps the initial search fast.

### 2. **Filter → Paginate → Fetch (Strict Order)**

* Filtering is applied **before** pagination
* Pagination determines what is rendered
* Drink details are fetched **only for visible (and next-page) items**

This ensures data fetching always aligns with what the user sees.

### 3. **Optimized Network Usage**

* Uses a concurrency-limited fetch utility to avoid API overload and due to the rate limiting on the API
* Prefetches details for the next page to improve perceived performance
* Cached details persist across pagination and filter changes

### 4. **UI Safety**

* Filters are disabled until visible drink details are loaded
* UI never blocks rendering while waiting for non-critical data


## Trade-offs & Assumptions

* Filtering by alcoholic content depends on drink **details**, not summaries
* Until details are loaded, drinks are temporarily allowed through filters
* Pagination is client-side for simplicity (API returns full result sets)
* No global state library (e.g. Redux) used since React state is sufficient at this scale

## What I’d Improve With More Time

* **Retry + exponential backoff** for failed API calls
* **Better loading states** (skeletons instead of text)
* **Accessibility improvements** (ARIA states for loading & filters)
* **E2E tests** for filter + pagination edge cases

## Summary

This project prioritizes:

* Correct data flow
* Predictable UI behavior
* Efficient network usage
* Maintainable architecture

The structure is intentionally scalable and ready for future enhancements without major refactors.
