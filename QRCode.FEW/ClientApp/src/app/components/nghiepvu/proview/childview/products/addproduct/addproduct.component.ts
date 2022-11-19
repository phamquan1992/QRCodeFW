import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inputcustom } from 'src/app/models/Inputcustom';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogUploadComponent } from 'src/app/shared/dialog-upload/dialog-upload.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProductsService } from '../products.service';
import { product } from 'src/app/models/product';
import { MessageService } from 'src/app/services/message.service';
import { data_upload, temp_object, value_it } from 'src/app/models/optioncs';
import { ObservableService } from 'src/app/services/observable.service';
import { nguoidung } from 'src/app/models/nguoidung';

@Component({
    selector: 'app-addproduct',
    templateUrl: './addproduct.component.html',
    styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
    DataForm: FormGroup = new FormGroup({
        logo: new FormControl('', Validators.required),
        url_img: new FormControl(''),
        url_iso: new FormControl(''),
        url_barcode: new FormControl(''),
        url_video: new FormControl(''),
    });
    payLoad: any;
    data!: Inputcustom[];
    data_macdinh!: Inputcustom[];
    data_mota!: Inputcustom[];
    data_khac!: Inputcustom[];
    dynamic_num = 0;
    ten_input = 'txt';
    src_img = '';
    src_daidien = '';
    src_sanpham = '';
    src_logo = '';
    src_chungchi = '';
    src_mavach = '';
    src_video = '';
    open_menu_mota = false;
    tilte = 'Thêm sản phẩm mới';
    status_type = false;
    gt_id!: Observable<string>;
    value_id = '';
    show_capnhat = false;
    product$!: Observable<product>;
    arr_mota = [
        { name: 'des_story', value: 'Câu chuyện sản phẩm' },
        { name: 'des_manufactur', value: 'Quy trình sản xuất' },
        { name: 'des_pack', value: 'Quy cách đóng gói' },
        { name: 'des_element', value: 'Thành phần' },
        { name: 'des_uses', value: 'Công dụng' },
        { name: 'des_guide', value: 'Hướng dẫn sử dụng' },
        { name: 'des_preserve', value: 'Bảo quản' },
        { name: 'des_startdate', value: 'Ngày sản xuất' },
        { name: 'des_enddate', value: 'Hạn sử dụng' },
    ];
    user_info!: nguoidung;
    constructor(private dialog: MatDialog, private route: ActivatedRoute, private router: Router, private productSrc: ProductsService, private mesSrc: MessageService, private sharingSrc: ObservableService) {

    }
    ngOnInit(): void {
        this.data = [];
        let id = this.route.snapshot.paramMap.get('id');
        this.value_id = id == null ? '0' : id.toString();
        if (this.value_id != '0') {
            this.tilte = 'Thông tin sản phẩm';
        }
        this.productSrc.get_detail_product(this.value_id).subscribe(t => {
            this.data = t;
            this.data_macdinh = this.data.filter(t => t.nhom == 'macdinh' && t.type != '');
            this.data_mota = this.data.filter(t => t.nhom == 'mota');
            this.data_khac = this.data.filter(t => t.nhom == 'khac');
            this.generateFormControls();
        });
        this.sharingSrc.getUserInfo().subscribe(t => {
            this.user_info = t;
        });
    }
    UpdateData() {
        if (this.DataForm.invalid) {
            this.mesSrc.error('Bạn chưa nhập đầy đủ thông tin bắt buộc');
            return;
        }
        this.payLoad = JSON.stringify(this.DataForm.getRawValue());
        this.product$ = this.productSrc.get_product(this.value_id);
        this.product$.subscribe(t => {
            const myObj = JSON.parse(JSON.stringify(t));
            let arr_key = Object.keys(myObj);
            let arr_dynamic2: temp_object[] = [];

            this.data.forEach(element => {
                element.value_ip = this.DataForm.controls[element.name].value;
                if (element.name.indexOf('dynamic_') == -1) {
                    myObj[element.name] = element.value_ip != null ? element.value_ip.toString().trim() : element.value_ip;
                }
                else {
                    let parent_dynamic2: temp_object = {
                        key: '',
                        values: {} as value_it
                    };
                    let obj_dynamic2: value_it = {
                        title: element.title,
                        value: element.value_ip != null ? element.value_ip.toString().trim() : element.value_ip
                    };
                    parent_dynamic2.key = element.name;
                    parent_dynamic2.values = obj_dynamic2;
                    arr_dynamic2.push(parent_dynamic2);
                }
                let index_arr = arr_key.indexOf(element.name);
                if (index_arr > -1) {
                    arr_key.splice(index_arr, 1);
                }
            });
            if (arr_dynamic2.length > 0) {
                myObj['additional'] = JSON.stringify(arr_dynamic2);
            } else {
                myObj['additional'] = null;
            }
            arr_key.forEach(element => {
                if (element != 'qrproductid' && element != 'created_by' && element != 'created_date' && element != 'lastcreated_by' && element != 'lastcreated_date'
                    && element != 'status' && element != 'additional')
                    myObj[element] = null;
            });
            if (this.value_id != '0') {
                myObj['created_by'] = this.user_info.id;
                this.productSrc.update_product(myObj).subscribe(t => {
                    if (t) {
                        this.mesSrc.success('Bạn đã thực hiện thành công!');
                        this.router.navigate(['/portal/products']);
                    } else {
                        this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
                    }
                });
            }
            else {
                myObj['lastcreated_by'] = this.user_info.id;
                this.productSrc.add_product(myObj).subscribe(
                    t => {
                        if (t) {
                            this.mesSrc.success('Bạn đã thực hiện thành công!');
                            this.router.navigate(['/portal/products']);
                        } else {
                            this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
                        }
                    }
                );
            }
        });
    }
    generateFormControls() {
        this.data.forEach(element => {
            if (element.name != 'logo' && element.name != 'url_img' && element.name != 'url_iso' && element.name != 'url_barcode' && element.name != 'url_video')
                this.DataForm.addControl(element.name, new FormControl(element.value_ip || '', element.is_require ? Validators.required : null));
            else {
                this.DataForm.controls[element.name].setValue(element.value_ip || '');
                if (element.name == 'logo') {
                    this.src_daidien = element.value_ip;
                }
                if (element.name == 'url_img') {
                    this.src_sanpham = element.value_ip;
                }
                if (element.name == 'url_iso') {
                    this.src_chungchi = element.value_ip;
                }
                if (element.name == 'url_barcode') {
                    this.src_mavach = element.value_ip;
                }
                if (element.name == 'url_video') {
                    this.src_video = element.value_ip;
                }
            }
        });
    }
    add_input(tmp: Inputcustom) {

        this.dynamic_num = this.dynamic_num + 1;
        this.data.push(tmp);
        if (tmp.nhom == 'khac') {
            this.data_khac.push(tmp);
        }
        if (tmp.nhom == 'mota') {
            this.data_mota.push(tmp);
        }
        this.DataForm.addControl(tmp.name, new FormControl(tmp.value_ip, tmp.is_require ? Validators.required : null));
    }
    exit_thempro(gt: boolean) {
        this.status_type = gt;
    }
    delete_input_temp(gt: string) {
        let index = this.data.findIndex(t => t.name == gt);
        this.data.splice(index, 1);
        this.data_mota = this.data.filter(t => t.nhom == 'mota');
        this.data_khac = this.data.filter(t => t.nhom == 'khac');
    }
    get_image_upload(gt: any) {
        this.src_img = gt.value;
    }
    str_st = '';
    showDialog(gt: string) {
        let data_show: data_upload = {
            type_file: 'image',
            forder_save: 'product'
        }
        if (gt == 'video')
            data_show.type_file = 'video';
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "520px";
        // dialogConfig.height = "310px";
        dialogConfig.panelClass = "pd_dialog_none";
        dialogConfig.data = data_show;
        this.dialog.open(DialogUploadComponent, dialogConfig).afterClosed().subscribe(
            res => {
                debugger;
                if (res != null && res != '' && res != undefined) {
                    if (gt == 'daidien') {
                        this.src_daidien = res;
                        this.DataForm.controls['logo'].setValue(res);
                    } else if (gt == 'sanpham') {
                        this.src_sanpham = res;
                        this.DataForm.controls['url_img'].setValue(res);
                    }
                    else if (gt == 'chungchi') {
                        this.src_chungchi = res;
                        this.DataForm.controls['url_iso'].setValue(res);
                    }
                    else if (gt == 'mavach') {
                        this.src_mavach = res;
                        this.DataForm.controls['url_barcode'].setValue(res);
                    }
                    else if (gt == 'video') {
                        this.src_video = res;
                        this.DataForm.controls['url_video'].setValue(res);
                    }
                }
            }
        );
    }
    select_mota(value_gt: string, mota_gt: string) {
        this.open_menu_mota = false;
        let tmp = {
            title: mota_gt,
            name: value_gt,
            is_require: true,
            is_visible: true,
            type: 'text',
            nhom: 'mota',
            is_delete: true,
            value_ip: ''
        };
        this.data.push(tmp);
        this.data_mota = this.data.filter(t => t.nhom == 'mota');
        this.DataForm.addControl(tmp.name, new FormControl(''));
    }
}
