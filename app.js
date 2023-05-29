const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
debugger;
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['1', 'Quiero descargar mi documentación', 'documentación', 'documentacion'])
    .addAnswer('¡Muy bien! 😊 ¿Qué documentación necesitás?')
    .addAnswer(
    [
        '1. Mis cupones de pago.',
        '2. Mi tarjeta obligatoria de circulación.',
        '3. Mi póliza completa.”',
    ],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword([])
    .addAnswer('Hola 😊, soy el asistente virtual de Patricio Gallo. ¿En qué te puedo ayudar hoy?')
    .addAnswer(
        ['Si tu consulta no está acá 👇 podés escribirla directamente',
        
            '1.	Quiero descargar mi documentación.',
            '2.	Quiero pagar mi seguro por transferencia.',
            '3.	Quiero contratar un seguro.',
            '4.	Quiero denunciar un siniestro.',
            '5.	Quiero pedir servicio de remolque.',
            '6.	Quiero transferir un vehículo.”',
        ],
        {capture:true},
        (ctx, {fallBack}) =>{
            console.log(ctx.body);
            console.log(ctx.body);
            if (['1', 'Quiero descargar mi documentación', 'documentación', 'documentacion'].some(value => ctx.body.includes(value))) {
                flowDocs;
            }else{
                console.log('vuelve atras')
               return fallBack();
            }
        },
        [flowDocs]
    )


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()