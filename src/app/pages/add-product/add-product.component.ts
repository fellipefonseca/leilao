import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import swal from 'sweetalert2';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
    product: any;
    picture: string = "";
    file: File;
    picError = false;
    addProductForm: FormGroup;

    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 350,
        resizeMaxWidth: 350
    };


    categories = [{ id: 1, value: "Anéis" }, { id: 2, value: "Pulseiras" }, { id: 3, value: "Colares" }]
    constructor(public router: Router, fb: FormBuilder, private productProvider: ProductService) {

        this.product = {};
        this.addProductForm = fb.group({
            'name': ['', [Validators.required, Validators.minLength(4)]],
            'price': ['', [Validators.required]],
            'image': ['', [Validators.required]],
            'description': ['', [Validators.required, Validators.minLength(10)]],
            'finalTime': ['', [Validators.required]],
        });

    }
    ngOnInit() {
    }

    createProduct() {
        if (this.picture == "") {
            this.picError = true;
        } else {
            this.picError = false;
            console.log(this.product);
            this.productProvider.add(this.product, this.file).then((res) => {
                swal({
                    title: "Produto adicionado com sucesso",
                    text: "Seu produto já está ativo no leilão.",
                    type: "success"
                })
                setTimeout(() => {
                    this.router.navigate(['/inicio']);
                }, 1000)

            });
        }
    }

    selected(imageResult: ImageResult) {
        this.picture = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;

        var blob = this.dataURItoBlob(this.picture);
        this.file = new File([blob], 'fileName.jpeg', { type: "image/png" });

    }

    dataURItoBlob(dataURI) {

        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = decodeURI(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    }

}
