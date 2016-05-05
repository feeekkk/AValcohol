<?php
/**
 * Created by PhpStorm.
 * User: Feek
 * Date: 3/16/16
 * Time: 3:46 PM
 */

namespace App\Http\Controllers;

use App\Http\Services\VendorService;
use Illuminate\Http\Request;

class VendorController extends Controller
{
/*
	public function getAllOrders(Request $request, VendorService $service) {
		// to do: migrate to service
		$orders = Order::with(['products', 'user.profile', 'address'])->get();
		return response()->json(['orders' => $orders]);
	}
*/

	/**
	 * Gets all orders that we have submitted to a vendor, awaiting their response
	 * @param Request $request
	 * @param VendorService $service
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function getAllPendingOrders(Request $request, VendorService $service) {
		// to do: authorize vendor
		$vendor = ['id' => 1];
		$orders = $service->getPendingOrders($vendor);
		return response()->json(['orders' => $orders]);
	}

	/**
	 * @param Request $request
	 * @param VendorService $service
	 * @return mixed
	 */
	public function create(Request $request, VendorService $service) {
		$this->validate($request, [
			'email' => 'required',
			'password' => 'required',
			'name' => 'required',
			'address' => 'required',
			'phone_number' => 'required',
			'delivery_zone_id' => 'required',
		]);

		$vendor = $service->create($request->input());

		return response()->json(['vendor' => $vendor]);
	}
}