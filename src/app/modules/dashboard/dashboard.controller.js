import moment from 'moment';

export default class dashboardController {

    constructor(dashboardService) {
        "ngInject";   
        this.dashboardService = dashboardService;    
        this.pessoas = [];
    }

    $onInit() {        
        this.pessoas = this.dashboardService.getPessoas();
    } 

    resetarFormPessoa(){
        this.pessoa = undefined;
        this.showForm = false;
    }

    resetarFormCheckIn(){
        this.pessoaCheckIn = undefined;
    }

    salvarPessoa(pessoa) {
        this.pessoas.push(pessoa);
        resetarFormPessoa();
    }

    calculaValorGasto(data){
        return  this.dashboardService.calculaValorGasto(data);
    }

    filtrarPessoas(valor){   
        this.pessoas = this.pessoas.filter(({nome, documento}) => {
            let comparaNome = nome.toLowerCase().includes(valor.toLowerCase());
            let comparaDocumento = documento.toLowerCase().includes(valor.toLowerCase());
            return  comparaDocumento || comparaNome;
        })
        if(this.pessoas.length == 0 || !valor){
            this.pessoas = this.dashboardService.getPessoas();
        }
    }

    filtrarPessoasPresentes(valor){
        if(valor) {
            this.listarAusentes = false;
            let dataHoje = moment();
            this.pessoas = this.dashboardService.getPessoas().filter(pessoa => {
                if(pessoa.checkIn){
                    return moment(pessoa.checkIn.dataSaida).isAfter(dataHoje);
                }
            })
        } else {
            this.pessoas = this.dashboardService.getPessoas();
        }       
    }

    filtrarPessoasAusentes(valor){
        if(valor) {
            let dataHoje = moment();
            this.listarPresentes = false;
            this.pessoas = this.dashboardService.getPessoas().filter(pessoa => {
                if(pessoa.checkIn){
                    return moment(pessoa.checkIn.dataSaida).isBefore(dataHoje);
                }
            })
        } else {
            this.pessoas = this.dashboardService.getPessoas();
        }
    }

    fazerCheckIn(pessoa) {
        for(let i = 0; i < this.pessoas.length; i++)
            if(this.pessoas[i].nome.toLowerCase() == pessoa.nome.toLowerCase()){
                this.pessoas[i] = pessoa;
        };
        this.resetarFormCheckIn();
    }

    bindPessoaSelecionada(pessoa){        
        if(pessoa && pessoa.nome) {
            this.pessoaCheckIn = pessoa;
            this.pessoaCheckIn.checkIn.dataEntrada = moment(pessoa.checkIn.dataEntrada).toDate();
            this.pessoaCheckIn.checkIn.dataSaida = moment(pessoa.checkIn.dataSaida).toDate();
            this.pessoaCheckIn.checkIn.adicionalVeiculo = pessoa.checkIn.adicionalVeiculo;
        }
    }
}