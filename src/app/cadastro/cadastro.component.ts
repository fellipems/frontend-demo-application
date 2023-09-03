import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  nome: String = '';
  senha: String = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  cadastroForm = this.formBuilder.group({
    nome: '',
    senha: ''

    // nome: ['', Validators.required],
    //   senha: ['', Validators.required],
  });

  associaChefeForm = this.formBuilder.group({
    chefe: '',
    subordinado: ''
  });

  colaboradorList: any[] = [];

  ngOnInit() {
    this.carregaColaboradorList();
  }

  carregaColaboradorList() {
    this.apiService.listAllUsers().subscribe((data: any[]) => {
      this.colaboradorList = data;
      console.log(this.colaboradorList);
    });
  }

  salvar() {
    this.apiService.salvarUsuario(this.cadastroForm.value.nome, this.cadastroForm.value.senha)
    .subscribe((data: any[]) => {
      this.carregaColaboradorList();
      this.cadastroForm.get('nome')?.setValue('');
      this.cadastroForm.get('senha')?.setValue('');
    });
  }

  listarTodos() {
    this.apiService.listAllUsers().subscribe((data: any[]) => console.log(data));
  }

  associaChefeSalvar() {
    this.apiService.salvarAssociaChefeSubordinado(this.associaChefeForm.value.chefe, this.associaChefeForm.value.subordinado)
    .subscribe((data: any[]) => {
      this.carregaColaboradorList();
      this.associaChefeForm.get('chefe')?.setValue('');
      this.associaChefeForm.get('subordinado')?.setValue('');
    });
  }
}
