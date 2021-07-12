import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PRODUCT_CATEGORIES } from 'src/app/util/constants';
import { ProductFormComponent } from './form/product.form.component';
import { ProductModel } from './model/product.model';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  public dataSource: MatTableDataSource<ProductModel>;
  public displayedColumns: string[] = [
    'name',
    'category',
    'description',
    'cost_price',
    'sale_price',
    'active',
    'actions',
  ];

  private _onDestroy = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _productService: ProductService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  public getData() {
    this._productService
      .fetchData()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((res) => (this.dataSource.data = res));
  }

  public deleteProduct(id: string) {
    this._productService.deleteProduct(id)
      .then(() => this._snackBar.open('Produto deletado com sucesso!', 'Fechar'))
      .catch(() => this._snackBar.open('Erro ao deletar o produto!', 'Fechar'));
  }

  public findProductCategory(id: number): string {
    return PRODUCT_CATEGORIES.find((v) => v.id == id).name;
  }

  public openDialog(id?: string) {
    this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: id
    })
  }

  public applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
