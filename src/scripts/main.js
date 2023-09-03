
$(document).ready(function () {
    $('#number').mask('(00) 00000-0000');
    $('#cpf').mask('000.000.000-00');
    $('#cep').mask('00000-000');

    $('#form').validate({
        errorElement: 'small',

        submitHandler: function () {
            alert("Dados enviados com sucesso.");
        },

        highlight: function (element) {
            $(element).closest("div").addClass("error").removeClass("valid");
        },
        unhighlight: function (element) {
            $(element).closest("div").removeClass("error").addClass('valid');
        },

        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            number: {
                required: true,
                minlength: 14
            },
            cpf: {
                required: true,
                minlength: 14
            },
            cep: {
                required: true,
                minlength: 9
            },
            sobrenome: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Este campo é obrigatório"
            },
            email: {
                required: "Este campo é obrigatório",
                email: "Insira um email valido"
            },
            number: {
                required: "Este campo é obrigatório",
                minlength: "Insira um numero valido"
            },
            cpf: {
                required: "Este campo é obrigatório",
                minlength: "Insira um CPF valido"
            },
            cep: {
                required: "Este campo é obrigatório",
                minlength: "Insira um CEP valido"
            },
            sobrenome: {
                required: "Este campo é obrigatório"
            }
        }
    });
});


