<?php
/**
 * Created by PhpStorm.
 * User: Feek
 * Date: 4/12/16
 * Time: 3:16 PM
 */

namespace App\Http\Services;
use App\Http\Repositories\Interfaces\AdminInterface;

class AdminService extends BaseService
{
	public function __construct(AdminInterface $adminRepo)
	{
		$this->repo = $adminRepo;
	}

	public function getOrdersReadyToBePickedUp() {
		return $this->repo->getOrdersReadyToBePickedUp();
	}
}