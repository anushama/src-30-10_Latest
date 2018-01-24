import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
/**
 * Generated class for the BillpaySortFiltersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-billpay-sort-filters',
  templateUrl: 'billpay-sort-filters.html',
})
export class BillpaySortFiltersPage {
  public sortForm: FormGroup;
  public viewOptions = {
    //hiddenPayees: false,
    eBills: false,
    status: false,
    rowHeight: false
  };

  public eBillCaption: string = '';
  public sortOrder: string;
  public showEBills: boolean = false;
  public hideBlock: string;
  public isCheckedMost = false;
  public isCheckedDesc = false;
  public isCheckedAsc = false;
  public sortOrderValue: any;
  public sortOrderType: any;
  public Asc: any = false;
  public Desc: any = false;
  public DT = false;

  public statues = [
    { value: 'Select All', text: 'Select All' },
    { value: 'Scheduled', text: 'Scheduled' },
    { value: 'In_Progress', text: 'In Progress' },
    { value: 'Insufficient_Funds', text: 'Insufficient Funds' },
    { value: 'Cancelled', text: 'Cancelled' },
    { value: 'Completed', text: 'Completed' },
    { value: 'Pending', text: 'Pending' },
    { value: 'Cleared', text: 'Cleared' },
    { value: 'Sent', text: 'Sent' },
    { value: 'Declined', text: 'Declined' },
    { value: 'Returned', text: 'Returned' },
    { value: 'Funds_Cleared', text: 'Funds Cleared' },
    { value: 'Funds_Outbound', text: 'Funds Outbound' },
    { value: 'Hold', text: 'Hold' },
    { value: 'Processed', text: 'Processed' },
    { value: 'Stopped', text: 'Stopped' },
    { value: 'Suspended', text: 'Suspended' },
    { value: 'Review', text: 'Review' },
    { value: 'Failed', text: 'Failed' }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.sortForm = new FormGroup({
      sortOrder: new FormControl(''),
      showHiddenPayees: new FormControl(false, []),
      showEBills: new FormControl(false, []),
      status: new FormControl(false, [])
    });

    //this.viewOptions.hiddenPayees = this.getViewOption('hiddenPayees');
    this.viewOptions.eBills = this.getViewOption('eBills');
    this.viewOptions.status = this.getViewOption('status');
    this.eBillCaption = 'Show E-Bill' + (this.viewOptions.status ? '' : 'er') + 's';

    this.sortOrderValue = this.navParams.get('order');
    this.sortOrderType = this.navParams.get('ascending');

    if (this.sortOrderValue == 'nextCycleDate'|| this.sortOrderValue == 'dueDateTime' || this.sortOrderValue == undefined) {
      this.DT = true;
    } else if (this.sortOrderValue == 'payeeName') {
      if (this.sortOrderType == true) {
        this.Asc = true;
      } else {
        this.Desc = true;
      }
    }
  }

  getViewOption(optionName) {
    return (this.navParams.data.viewOptions.toLowerCase().indexOf(optionName.toLowerCase()) >= 0);
  }

  doSubmitSortType() {
    //this.viewCtrl.dismiss(this.sortForm.sortOrder.value);
  }
  selectSortOption(value) {

    let data = value;
    if (data == "payeeNameDesc") {
      this.sortOrder = "payeeNameDesc";
      this.isCheckedDesc = true;
    } else if (data == "payeeNameAsc") {
      this.sortOrder = "payeeNameAsc";
      this.isCheckedAsc = true;
    } else {
      this.isCheckedMost = true
      this.sortOrder = "mostRecent";
    }
    //console.log("SORT OPTION = " + data)
    this.viewCtrl.dismiss(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillpaySortFiltersPage');
  }
}
