# Hostel Management System

## Live Site
[Hostel Management](https://rr-hostel-manage.netlify.app/)

## Key Features

### Responsive Homepage
- The homepage is designed to be responsive for mobile, tablet, and desktop users.
- The navigation bar includes a logo, website name, Home, Meals, Upcoming Meals, Notification icon, and Join Us button.
- If logged in, the user's profile picture appears on the navbar with a dropdown containing options like User name, Dashboard, and Logout.

### Meals by Category
- Implemented a tab system for Meals by Category, including Breakfast, Lunch, and Dinner.
- Each tab shows a minimum of 3 meal cards with details like title, image, rating, price, and a details button.
- Users can click the details button to view more information about a specific meal.

### Membership Section
- Users can upgrade their membership to request meals, choosing from Silver, Gold, and Platinum packages.
- Different prices are set for each package, and clicking on a package card redirects the user to the payment page.

### Meal Detail Page
- Users can view detailed information about a meal, including image, admin/distributor name, description, ingredients, post time, rating, like button, and meal request button.
- Like and meal request buttons are functional, with login required for these actions.
- Users can give reviews, and the system tracks review counts.

### Meals Page
- Displays all meals with search functionality based on meal title.
- Implements filter-by-category and filter-by-price-range options.
- Implements infinite scrolling for more meal cards as the user scrolls.

### Upcoming Meals
- Shows all upcoming meals as cards added by the admin.
- Users can give likes to each meal, with a limit of one like per meal.

### Checkout Page
- A dynamic and private route for users to purchase specific packages.
- Shows package details and implements the Stripe Payment method.
- After successful payment, a modal confirms the purchase, and users receive a badge based on the purchased package.

### Authentication (Join Us Page)
- Implements authentication with login and register pages.
- Includes at least one social login option.
- Uses react-hook-form for form handling.
- Users receive a Bronze Badge upon their first registration.

### User Dashboard
- Private route layout with routes for My Profile, Requested Meals, and My Reviews.
- My Profile page shows user information, badges, and two possible badges (Bronze and Gold).
- Requested Meals and My Reviews pages display relevant information in tabular form.

### Admin Dashboard
- Private route layout with routes for Admin Profile, Manage Users, Add Meal, All Meals, All Reviews, Serve Meals, and Upcoming Meals.
- Manage Users page displays user information with the ability to make a user admin.
- Add Meal page has a form to add meal details and the option to add to upcoming meals.
- All Meals and All Reviews pages display relevant information in tabular form.
- Serve Meals page allows the admin to manage requested meals.