<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Models\Entities\Product::class, function(Faker\Generator $faker) {
	return [
		'upc' => $faker->randomNumber(9),
		'name' => $faker->name(),
		'featured' => $faker->boolean(10), // will be true 10 percent of the time
		'image_url' => 'genesee-cream-ale.jpg'
	];
});

$factory->define(App\Models\Entities\User::class, function(Faker\Generator $faker) {
	return [
		'email' => $faker->email(),
		'password' => $faker->password()
	];
});

$factory->define(App\Models\Entities\UserAddress::class, function(Faker\Generator $faker) {
	return [
		'street' => $faker->streetName(),
		'city' => $faker->city(),
		'state' => $faker->citySuffix(),
		'zipcode' => $faker->randomNumber(5)
	];
});

$factory->define(App\Models\Entities\UserProfile::class, function(Faker\Generator $faker) {
	return [
		'first_name' => $faker->firstName,
		'last_name' => $faker->lastName,
		'phone_number' => $faker->phoneNumber,
		'date_of_birth' => $faker->date()
	];
});

$factory->define(App\Models\Entities\Order::class, function(\Faker\Generator $faker) {
	return [
		'amount' => $faker->randomNumber(2),
		'user_id' => 1,
		'user_address_id' => 1
	];
});

$factory->define(App\Models\Entities\OrderStatus::class, function(\Faker\Generator $faker) {
	return [
		'vendor_status' => 'pending',
		'delivery_status' => 'pending'
	];
});

$factory->define(App\Models\Entities\Vendor::class, function(\Faker\Generator $faker) {
	return [
		'name' => $faker->company,
		'address' => $faker->address,
		'phone_number' => $faker->phoneNumber
	];
});

$factory->define(App\Models\Entities\VendorSetting::class, function(\Faker\Generator $faker) {
	return [

	];
});