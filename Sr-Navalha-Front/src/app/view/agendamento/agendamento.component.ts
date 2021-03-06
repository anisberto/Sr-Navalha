import { Route } from '@angular/compiler/src/core';
import { LoginKeycloakService } from './../../controllers/loginKeykloac.service';
import { Servico } from 'src/app/models/servico';
import { ServicoService } from './../../controllers/servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import { Endereco } from 'src/app/models/endereco';
import { UsuarioClienteService } from 'src/app/controllers/usuario-cliente.service';
import { AgendamentoService } from './../../controllers/agendamento.service';
import { BuscaCEP } from './../../models/EnderecoCEP';
import { ConsultaCepService } from 'src/app/controllers/consulta-cep.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Agendamento } from 'src/app/models/Agendamento';

@Component({
  selector: 'ads-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']

})

export class AgendamentoComponent implements OnInit {

  selectedForma: any
  formas = ['DINHEIRO', 'CARTAO']
  estados: any[] = [];
  cidades: any[] = [];

  public formulario: FormGroup = new FormGroup({
    "logradouro": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    "numero": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    "bairro": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    "cep": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(8)]),
    "cidade": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(8)]),
    "estado": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(8)]),
    "complemento": new FormControl(null),
    "formaPagamento": new FormControl(null, Validators.required)
  })

  public novoEndereco: boolean = false;
  endereco: BuscaCEP = {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    unidade: '',
    ibge: '',
    gia: ''
  }
  servicoNew!: Servico
  numero: any;
  agendamentoNew: Agendamento = {
    cliente: null,
    data!: new Date(),
    formaPagamento: '',
    status: 'PENDENTE',
    endereco!: new Endereco,
    horario: null,
    id: '',
    servico: null
  }
  formaPagamento: any
  agendamentoRetornado: any
  AdminNome: any
  servicoAgenda!: any
  usuarioClienteAgenda!: any
  dataAgendamento: any;
  horaAgendamento: any;

  constructor(
    private loginService: LoginKeycloakService,
    private consulta: ConsultaCepService,
    private servicoservice: ServicoService,
    private agendamentoService: AgendamentoService,
    private usuarioClienteService: UsuarioClienteService,
    private route: ActivatedRoute,
    private rou: Router) { }
  token: any = sessionStorage.getItem("access_token")
  nome: any = localStorage.getItem("name");
  tipo: any = localStorage.getItem("tipo");

  ngOnInit(): void {
    const email = localStorage.getItem("loginEmail")
    this.usuarioClienteService.findClienteByEmail(email).subscribe((result) => {
      this.usuarioClienteAgenda = result;
    })
    this.AdminNome = localStorage.getItem("name");
    const id: any = this.route.snapshot.paramMap.get("id");
    this.servicoservice.findAllServicosById(id).subscribe((result) => {
      this.servicoNew = result;
    })
    if (document.querySelector('input [value = "checked"]')) {
      this.novoEndereco = true
    }
    this.horaAgendamento = document.querySelector('input[type="time"]');
    this.dataAgendamento = document.querySelector('input[type="date"]');
  }

  buscarEndereco(cepInput: any) {
    this.consulta.consultaCEP(cepInput.value).subscribe((retorno) => {
      this.endereco = retorno
    })
  }

  salvarAgendamento() {
    this.agendamentoNew.formaPagamento = this.selectedForma;
    this.agendamentoNew.endereco.numero = this.numero
    this.agendamentoNew.cliente = this.usuarioClienteAgenda
    this.agendamentoNew.servico = this.servicoNew;
    this.agendamentoNew.formaPagamento = 'DINHEIRO';
    this.agendamentoNew.status = 'PENDENTE';
    this.agendamentoNew.horario = this.horaAgendamento.value;
    this.agendamentoNew.data = this.dataAgendamento.value;
    this.agendamentoNew.endereco.bairro = this.endereco.bairro
    this.agendamentoNew.endereco.cep = this.endereco.cep
    this.agendamentoNew.endereco.cidade.uf = this.endereco.uf
    this.agendamentoNew.endereco.cidade.localidade = this.endereco.localidade
    this.agendamentoNew.endereco.logradouro = this.endereco.logradouro
    this.agendamentoService.createAgendamento(this.agendamentoNew).subscribe((result) => {
      this.agendamentoRetornado = result
    })
    swal({ title: "Agendamento incluido com sucesso!", icon: "success" })
    setTimeout(() => {
      this.rou.navigate(["/telaCliente/agend"])
    }, 3000);
  }

  login() {
    this.sair()
    this.loginService.login();
  }

  getToken() {
    this.loginService.getToken();
  }

  sair() {
    this.loginService.logout()
    this.clearLocalStorage()
    setTimeout(() => {
      location.reload()
    }, 3000);
  }

  estaLogado(): boolean {
    return this.loginService.getIsLogged()
  }
  reloadPage() {
    location.reload()
  }
  clearLocalStorage() {
    localStorage.removeItem("preferred_username")
    localStorage.removeItem("loginEmail")
    localStorage.removeItem("access_token_ads04")
    localStorage.removeItem("name")
    localStorage.removeItem("tipo")
  }
}
