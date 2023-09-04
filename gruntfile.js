const { task } = require('grunt');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //* Config SASS *\\
        less: {
            //? Config pasta dev
            dev: {
                //? Caminho do arquivo que será criado : Caminho do arquivo que será compilado
                files: {
                    'dev/styles/main.css': 'src/less/main.less'
                }
            },
            //? Config pasta dist 
            dist: {
                //? Comprimindo o arquivo 
                options: {
                    compress: true
                },
                //? Caminho do arquivo que será criado : Caminho do arquivo que será comprimido
                files: {
                    'dist/styles/main.min.css': 'src/less/main.less'
                }
            }
        },
        //* Config do Replace, plugin capaz de alterar os endereços do html *\\
        replace: {
            //? Config pasta dev
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'CSS_ADDRESS', //? @@ passado no html
                            replacement: './styles/main.css' //? Alteração que sera aplicada
                        },
                        {
                            match: 'MAINJS_ADDRESS', //? @@ passado no html
                            replacement: '../src/scripts/main.js' //? Alteração que sera aplicada
                        },
                        {
                            match: 'MASK_PLUGIN_ADDRESS', //? @@ passado no html
                            replacement: '../src/scripts/plugins/jquery.mask.min.js' //? Alteração que sera aplicada
                        },
                        {
                            match: 'VALIDATE_PLUGIN_ADDRESS', //? @@ passado no html
                            replacement: '../src/scripts/plugins/jquery.validate.min.js' //? Alteração que sera aplicada
                        },
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'], //? Caminho do arquivo origem
                        dest: 'dev/' //? Caminho do arquivo final
                    }
                ]
            },
            //? Config pasta dist 
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'CSS_ADDRESS', //? @@ passado no html
                            replace: './styles/main.min.css' //? Alteração que sera aplicada
                        },
                        {
                            match: 'MAINJS_ADDRESS', //? @@ passado no html
                            replacement: './scripts/main.min.js' //? Alteração que sera aplicada
                        },
                        {
                            match: 'MASK_PLUGIN_ADDRESS', //? @@ passado no html
                            replacement: './scripts/plugins/jquery.mask.min.js' //? Alteração que sera aplicada
                        },
                        {
                            match: 'VALIDATE_PLUGIN_ADDRESS', //? @@ passado no html
                            replacement: './scripts/plugins/jquery.validate.min.js' //? Alteração que sera aplicada
                        },
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'], //? Caminho do arquivo origem
                        dest: 'dist/' //? Caminho do arquivo final
                    }
                ]
            }
        },
        //* Config htmlmin, plugin que minifica o arquivo html *\\
        htmlmin: {
            //? Config pasta dist
            dist: {
                //? removendo comentários e fazendo o arquivo ocupar apenas uma linha
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                //? pegando o html da pasta src e minificando na pasta prebuild que será excluída 
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        //* Config uglify, plugin que minifica o arquivo js *\\
        uglify: {
            target: {
                //? Caminho do arquivo que será criado : Caminho do arquivo que será comprimido
                files: {
                    'dist/scripts/main.min.js': './src/scripts/main.js',
                    'dist/scripts/plugins/jquery.mask.min.js': './src/scripts/plugins/jquery.mask.min.js',
                    'dist/scripts/plugins/jquery.validate.min.js': './src/scripts/plugins/jquery.validate.min.js'
                }
            }
        },
        //* Config watch, plugin que observa mudanças nos arquivos *\\
        watch: {
            less: {
                files: ['src/less/**/*.less'],
                tasks: ['less:dev']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        //* Apagando a pasta prebuild usada para minificar o html antes de ser passado para dist *\\
        clean: ['prebuild']
    });
    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('build', ['less:dist', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
};