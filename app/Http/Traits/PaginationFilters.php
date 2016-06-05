<?php
/**
 * Created by PhpStorm.
 * User: Feek
 * Date: 6/4/16
 * Time: 11:11 PM
 */

namespace App\Http\Traits;

use App\Exceptions\APIException;

trait PaginationFilters {
	protected $pageNumber;
	protected $recordsPerPage;

	/**
	 * @param $number
	 */
	public function page($number) {
		$this->pageNumber = $number;
	}

	/**
	 * @param $amount
	 * @return mixed
	 * @throws APIException
	 */
	public function per_page($amount) {
		$this->recordsPerPage = $amount;

		if (!$this->pageNumber) {
			throw new APIException('The page parameter needs to be sent before per_page');
		}

		$offset = ($this->pageNumber - 1) * $this->recordsPerPage;
		return $this->builder->offset($offset)->take($this->recordsPerPage);
	}
}