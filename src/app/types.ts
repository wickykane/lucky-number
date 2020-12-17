export interface CustomerWinner {
  id: number;
  customer_id: number;
  code: string;
  location_type: number;
  customer: Customer;
}

export interface Customer {
  name: string;
  social_id: string;
  phone_numer: string;
  address_line: string;
  ward_id: number;
  district_id: number;
  province_id: number;
  country_id: number;
  location_type: string;
}

export interface ApiResponse {
  message: string;
  data: any;
}

export interface CustomerWinnerResponse extends ApiResponse {
  data: CustomerWinner;
}

export interface PrizeResponse extends ApiResponse {
  data: {
    current_prize: Prize;
  };
}

export interface FinalizeCustomerWinnerParams {
  prize_id: number;
  customer_id: number;
  customer_prize_code_id: number;
  location_type: number;
}
export interface Prize {
  id: number;
  event_id: number;
  name: string;
  order_display: number;
  backdrop: string;
  num_of_winer: number;
  num_of_winer_remain: number;
}
