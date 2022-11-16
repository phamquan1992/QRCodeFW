import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { location } from 'src/app/models/location';
import { qr_enterprise } from 'src/app/models/qr_enterprise';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private dataSrv: DataService) {

  }
  get_quocgia() {
    return this.array_quocgia;
  }

  get_location(code: string) {
    return this.dataSrv.get('qr_enterprise/location/' + code) as Observable<location[]>;
  }
  get_list_cty() {
    return this.dataSrv.get('qr_enterprise/list') as Observable<qr_enterprise[]>;
  }
  get_object_cty(id: string) {
    return this.dataSrv.get('qr_enterprise/object/' + id) as Observable<qr_enterprise>;
  }
  check_401() {
    return this.dataSrv.get('qr_enterprise/Check401') as Observable<boolean>;
  }
  update_company(cty_obj: qr_enterprise) {
    return this.dataSrv.put('qr_enterprise/Update', cty_obj);
  }
  update_status(arr_cty: qr_enterprise[]) {
    return this.dataSrv.put('qr_enterprise/ChangeStatus', arr_cty);
  }
  add_company(cty_obj: qr_enterprise) {
    return this.dataSrv.post('qr_enterprise/Add', cty_obj);
  }
  delete_obj(id: string) {
    return this.dataSrv.delete('qr_enterprise/delete', id);
  }
  delete_arr(arr_id: number[]) {
    return this.dataSrv.delete_array('qr_enterprise/delete', arr_id);
  }
  get_view_enterprise(id: string | number) {
    let pro_obj: Observable<qr_enterprise> = this.dataSrv.get('ViewData/enterprise/' + id) as Observable<qr_enterprise>;
    return pro_obj;
  }
  array_quocgia = [{ key: 'Albania', value: 'Albania' },
  { key: 'Algeria', value: 'Algeria' },
  { key: 'American Samoa', value: 'American Samoa' },
  { key: 'Andorra', value: 'Andorra' },
  { key: 'Angola', value: 'Angola' },
  { key: 'Anguilla', value: 'Anguilla' },
  { key: 'Antarctica', value: 'Antarctica' },
  { key: 'Antigua and Barbuda', value: 'Antigua and Barbuda' },
  { key: 'Argentina', value: 'Argentina' },
  { key: 'Armenia', value: 'Armenia' },
  { key: 'Aruba', value: 'Aruba' },
  { key: 'Australia', value: 'Australia' },
  { key: 'Austria', value: 'Austria' },
  { key: 'Azerbaijan', value: 'Azerbaijan' },
  { key: 'Bahamas', value: 'Bahamas' },
  { key: 'Bahrain', value: 'Bahrain' },
  { key: 'Bangladesh', value: 'Bangladesh' },
  { key: 'Barbados', value: 'Barbados' },
  { key: 'Belarus', value: 'Belarus' },
  { key: 'Belgium', value: 'Belgium' },
  { key: 'Belize', value: 'Belize' },
  { key: 'Benin', value: 'Benin' },
  { key: 'Bermuda', value: 'Bermuda' },
  { key: 'Bhutan', value: 'Bhutan' },
  { key: 'Bolivia', value: 'Bolivia' },
  { key: 'Bonaire: Sint Eustatius and Saba', value: 'Bonaire: Sint Eustatius and Saba' },
  { key: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina' },
  { key: 'Botswana', value: 'Botswana' },
  { key: 'Bouvet Island', value: 'Bouvet Island' },
  { key: 'Brazil', value: 'Brazil' },
  { key: 'British Indian Ocean Territory', value: 'British Indian Ocean Territory' },
  { key: 'Brunei Darussalam', value: 'Brunei Darussalam' },
  { key: 'Bulgaria', value: 'Bulgaria' },
  { key: 'Burkina Faso', value: 'Burkina Faso' },
  { key: 'Burundi', value: 'Burundi' },
  { key: 'Cambodia', value: 'Cambodia' },
  { key: 'Cameroon', value: 'Cameroon' },
  { key: 'Canada', value: 'Canada' },
  { key: 'Cape Verde', value: 'Cape Verde' },
  { key: 'Cayman Islands', value: 'Cayman Islands' },
  { key: 'Central African Resharedb', value: 'Central African Resharedb' },
  { key: 'Chad', value: 'Chad' },
  { key: 'Chile', value: 'Chile' },
  { key: 'China', value: 'China' },
  { key: 'Christmas Island', value: 'Christmas Island' },
  { key: 'Cocos (Keeling) Islands', value: 'Cocos (Keeling) Islands' },
  { key: 'Colombia', value: 'Colombia' },
  { key: 'Comoros', value: 'Comoros' },
  { key: 'Congo', value: 'Congo' },
  { key: 'Congo', value: 'Congo' },
  { key: 'Cook Islands', value: 'Cook Islands' },
  { key: 'Costa Rica', value: 'Costa Rica' },
  { key: 'Côte d"Ivoire', value: 'Côte dIvoire' },
  { key: 'Croatia', value: 'Croatia' },
  { key: 'Cuba', value: 'Cuba' },
  { key: 'Curaçao', value: 'Curaçao' },
  { key: 'Cyprus', value: 'Cyprus' },
  { key: 'Czech Resharedb', value: 'Czech Resharedb' },
  { key: 'Denmark', value: 'Denmark' },
  { key: 'Djibouti', value: 'Djibouti' },
  { key: 'Dominica', value: 'Dominica' },
  { key: 'Dominican Resharedb', value: 'Dominican Resharedb' },
  { key: 'Ecuador', value: 'Ecuador' },
  { key: 'Egypt', value: 'Egypt' },
  { key: 'El Salvador', value: 'El Salvador' },
  { key: 'Equatorial Guinea', value: 'Equatorial Guinea' },
  { key: 'Eritrea', value: 'Eritrea' },
  { key: 'Estonia', value: 'Estonia' },
  { key: 'Ethiopia', value: 'Ethiopia' },
  { key: 'Falkland Islands (Malvinas)', value: 'Falkland Islands (Malvinas)' },
  { key: 'Faroe Islands', value: 'Faroe Islands' },
  { key: 'Fiji', value: 'Fiji' },
  { key: 'Finland', value: 'Finland' },
  { key: 'France', value: 'France' },
  { key: 'French Guiana', value: 'French Guiana' },
  { key: 'French Polynesia', value: 'French Polynesia' },
  { key: 'French Southern Territories', value: 'French Southern Territories' },
  { key: 'Gabon', value: 'Gabon' },
  { key: 'Gambia', value: 'Gambia' },
  { key: 'Georgia', value: 'Georgia' },
  { key: 'Germany', value: 'Germany' },
  { key: 'Ghana', value: 'Ghana' },
  { key: 'Gibraltar', value: 'Gibraltar' },
  { key: 'Greece', value: 'Greece' },
  { key: 'Greenland', value: 'Greenland' },
  { key: 'Grenada', value: 'Grenada' },
  { key: 'Guadeloupe', value: 'Guadeloupe' },
  { key: 'Guam', value: 'Guam' },
  { key: 'Guatemala', value: 'Guatemala' },
  { key: 'Guernsey', value: 'Guernsey' },
  { key: 'Guinea', value: 'Guinea' },
  { key: 'Guinea-Bissau', value: 'Guinea-Bissau' },
  { key: 'Guyana', value: 'Guyana' },
  { key: 'Haiti', value: 'Haiti' },
  { key: 'Heard Island and McDonald Islands', value: 'Heard Island and McDonald Islands' },
  { key: 'Holy See (Vatican City State)', value: 'Holy See (Vatican City State)' },
  { key: 'Honduras', value: 'Honduras' },
  { key: 'Hong Kong', value: 'Hong Kong' },
  { key: 'Hungary', value: 'Hungary' },
  { key: 'Iceland', value: 'Iceland' },
  { key: 'India', value: 'India' },
  { key: 'Indonesia', value: 'Indonesia' },
  { key: 'Iran', value: 'Iran' },
  { key: 'Iraq', value: 'Iraq' },
  { key: 'Ireland', value: 'Ireland' },
  { key: 'Isle of Man', value: 'Isle of Man' },
  { key: 'Israel', value: 'Israel' },
  { key: 'Italy', value: 'Italy' },
  { key: 'Jamaica', value: 'Jamaica' },
  { key: 'Japan', value: 'Japan' },
  { key: 'Jersey', value: 'Jersey' },
  { key: 'Jordan', value: 'Jordan' },
  { key: 'Kazakhstan', value: 'Kazakhstan' },
  { key: 'Kenya', value: 'Kenya' },
  { key: 'Kiribati', value: 'Kiribati' },
  { key: 'North Korea', value: 'North Korea' },
  { key: 'Korea', value: 'Korea' },
  { key: 'Kuwait', value: 'Kuwait' },
  { key: 'Kyrgyzstan', value: 'Kyrgyzstan' },
  { key: 'Lao', value: 'Lao' },
  { key: 'Latvia', value: 'Latvia' },
  { key: 'Lebanon', value: 'Lebanon' },
  { key: 'Lesotho', value: 'Lesotho' },
  { key: 'Liberia', value: 'Liberia' },
  { key: 'Libya', value: 'Libya' },
  { key: 'Liechtenstein', value: 'Liechtenstein' },
  { key: 'Lithuania', value: 'Lithuania' },
  { key: 'Luxembourg', value: 'Luxembourg' },
  { key: 'Macao', value: 'Macao' },
  { key: 'Macedonia', value: 'Macedonia' },
  { key: 'Madagascar', value: 'Madagascar' },
  { key: 'Malawi', value: 'Malawi' },
  { key: 'Malaysia', value: 'Malaysia' },
  { key: 'Maldives', value: 'Maldives' },
  { key: 'Mali', value: 'Mali' },
  { key: 'Malta', value: 'Malta' },
  { key: 'Marshall Islands', value: 'Marshall Islands' },
  { key: 'Martinique', value: 'Martinique' },
  { key: 'Mauritania', value: 'Mauritania' },
  { key: 'Mauritius', value: 'Mauritius' },
  { key: 'Mayotte', value: 'Mayotte' },
  { key: 'Mexico', value: 'Mexico' },
  { key: 'Micronesia', value: 'Micronesia' },
  { key: 'Moldova', value: 'Moldova' },
  { key: 'Monaco', value: 'Monaco' },
  { key: 'Mongolia', value: 'Mongolia' },
  { key: 'Montenegro', value: 'Montenegro' },
  { key: 'Montserrat', value: 'Montserrat' },
  { key: 'Morocco', value: 'Morocco' },
  { key: 'Mozambique', value: 'Mozambique' },
  { key: 'Myanmar', value: 'Myanmar' },
  { key: 'Namibia', value: 'Namibia' },
  { key: 'Nauru', value: 'Nauru' },
  { key: 'Nepal', value: 'Nepal' },
  { key: 'Netherlands', value: 'Netherlands' },
  { key: 'New Caledonia', value: 'New Caledonia' },
  { key: 'New Zealand', value: 'New Zealand' },
  { key: 'Nicaragua', value: 'Nicaragua' },
  { key: 'Niger', value: 'Niger' },
  { key: 'Nigeria', value: 'Nigeria' },
  { key: 'Niue', value: 'Niue' },
  { key: 'Norfolk Island', value: 'Norfolk Island' },
  { key: 'Northern Mariana Islands', value: 'Northern Mariana Islands' },
  { key: 'Norway', value: 'Norway' },
  { key: 'Oman', value: 'Oman' },
  { key: 'Pakistan', value: 'Pakistan' },
  { key: 'Palau', value: 'Palau' },
  { key: 'Palestine', value: 'Palestine' },
  { key: 'Panama', value: 'Panama' },
  { key: 'Papua New Guinea', value: 'Papua New Guinea' },
  { key: 'Paraguay', value: 'Paraguay' },
  { key: 'Peru', value: 'Peru' },
  { key: 'Philippines', value: 'Philippines' },
  { key: 'Pitcairn', value: 'Pitcairn' },
  { key: 'Poland', value: 'Poland' },
  { key: 'Portugal', value: 'Portugal' },
  { key: 'Puerto Rico', value: 'Puerto Rico' },
  { key: 'Qatar', value: 'Qatar' },
  { key: 'Réunion', value: 'Réunion' },
  { key: 'Romania', value: 'Romania' },
  { key: 'Russian', value: 'Russian' },
  { key: 'Rwanda', value: 'Rwanda' },
  { key: 'Saint Barthélemy', value: 'Saint Barthélemy' },
  { key: 'Saint Helena: Ascension and Tristan da Cunha', value: 'Saint Helena: Ascension and Tristan da Cunha' },
  { key: 'Saint Kitts and Nevis', value: 'Saint Kitts and Nevis' },
  { key: 'Saint Lucia', value: 'Saint Lucia' },
  { key: 'Saint Martin (French part)', value: 'Saint Martin (French part)' },
  { key: 'Saint Pierre and Miquelon', value: 'Saint Pierre and Miquelon' },
  { key: 'Saint Vincent and the Grenadines', value: 'Saint Vincent and the Grenadines' },
  { key: 'Samoa', value: 'Samoa' },
  { key: 'San Marino', value: 'San Marino' },
  { key: 'Sao Tome and Principe', value: 'Sao Tome and Principe' },
  { key: 'Saudi Arabia', value: 'Saudi Arabia' },
  { key: 'Senegal', value: 'Senegal' },
  { key: 'Serbia', value: 'Serbia' },
  { key: 'Seychelles', value: 'Seychelles' },
  { key: 'Sierra Leone', value: 'Sierra Leone' },
  { key: 'Singapore', value: 'Singapore' },
  { key: 'Sint Maarten (Dutch part)', value: 'Sint Maarten (Dutch part)' },
  { key: 'Slovakia', value: 'Slovakia' },
  { key: 'Slovenia', value: 'Slovenia' },
  { key: 'Solomon Islands', value: 'Solomon Islands' },
  { key: 'Somalia', value: 'Somalia' },
  { key: 'South Africa', value: 'South Africa' },
  { key: 'South Georgia and the South Sandwich Islands', value: 'South Georgia and the South Sandwich Islands' },
  { key: 'South Sudan', value: 'South Sudan' },
  { key: 'Spain', value: 'Spain' },
  { key: 'Sri Lanka', value: 'Sri Lanka' },
  { key: 'Sudan', value: 'Sudan' },
  { key: 'Suriname', value: 'Suriname' },
  { key: 'Svalbard and Jan Mayen', value: 'Svalbard and Jan Mayen' },
  { key: 'Swaziland', value: 'Swaziland' },
  { key: 'Sweden', value: 'Sweden' },
  { key: 'Switzerland', value: 'Switzerland' },
  { key: 'Syrian Arab Resharedb', value: 'Syrian Arab Resharedb' },
  { key: 'Taiwan', value: 'Taiwan' },
  { key: 'Tajikistan', value: 'Tajikistan' },
  { key: 'Tanzania', value: 'Tanzania' },
  { key: 'Thailand', value: 'Thailand' },
  { key: 'Timor-Leste', value: 'Timor-Leste' },
  { key: 'Togo', value: 'Togo' },
  { key: 'Tokelau', value: 'Tokelau' },
  { key: 'Tonga', value: 'Tonga' },
  { key: 'Trinidad and Tobago', value: 'Trinidad and Tobago' },
  { key: 'Tunisia', value: 'Tunisia' },
  { key: 'Turkey', value: 'Turkey' },
  { key: 'Turkmenistan', value: 'Turkmenistan' },
  { key: 'Turks and Caicos Islands', value: 'Turks and Caicos Islands' },
  { key: 'Tuvalu', value: 'Tuvalu' },
  { key: 'Uganda', value: 'Uganda' },
  { key: 'Ukraine', value: 'Ukraine' },
  { key: 'United Arab Emirates', value: 'United Arab Emirates' },
  { key: 'United Kingdom', value: 'United Kingdom' },
  { key: 'United States', value: 'United States' },
  { key: 'United States Minor Outlying Islands', value: 'United States Minor Outlying Islands' },
  { key: 'Uruguay', value: 'Uruguay' },
  { key: 'Uzbekistan', value: 'Uzbekistan' },
  { key: 'Vanuatu', value: 'Vanuatu' },
  { key: 'Venezuela', value: 'Venezuela' },
  { key: 'Việt Nam', value: 'Việt Nam' },
  { key: 'Virgin Islands: British', value: 'Virgin Islands: British' },
  { key: 'Virgin Islands: U.S.', value: 'Virgin Islands: U.S.' },
  { key: 'Wallis and Futuna', value: 'Wallis and Futuna' },
  { key: 'Western Sahara', value: 'Western Sahara' },
  { key: 'Yemen', value: 'Yemen' },
  { key: 'Zambia', value: 'Zambia' },
  { key: 'Zimbabwe', value: 'Zimbabwe' },
  { key: 'Afghanistan', value: 'Afghanistan' },
  { key: 'Netherlands Antilles', value: 'Netherlands Antilles' },
  ];
}
