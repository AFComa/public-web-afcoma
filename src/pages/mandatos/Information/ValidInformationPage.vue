<template>
  <div class="q-pt-lg q-pa-md">
    <div class="justify-center q-col-gutter-md row">
      <div class="col-xs-12 col-sm-10 col-md-11">
        <BreadCrumb :routes="breadcrumbRoutes" />
        <q-stepper
          v-model="step"
          ref="stepper"
          animated
          done-color="green"
          active-color="purple"
          inactive-color="secondary"
        >
          <q-step
            :name="1"
            title="Validar Información Mandatos"
            icon="settings"
            :done="step > 1"
          >
            <FileComponentVue />
          </q-step>

          <q-step
            :name="2"
            title="Carga de contratos Mandatos"
            icon="create_new_folder"
            :done="step > 2"
          >
            <FileDocument />
          </q-step>

          <q-step :name="3" title="Creación del Mandato" icon="add_comment">
            Nose que poner
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation
              style="text-align: center !important"
              class="q-pt-md"
            >
              <q-btn
                no-caps
                size="lg"
                rounded
                @click="
                  step === 3 ? saveInfo() : loadingResult();
                  $refs.stepper.next();
                "
                color="secondary"
                :label="step === 3 ? 'Finalizar' : 'Continuar'"
              />
              <q-btn
                v-if="step > 1"
                size="lg"
                no-caps
                rounded
                color="primary"
                @click="$refs.stepper.previous()"
                label="Regresar"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
        <LoadingComponentBasic v-if="loading" />
        <DialogComponent
          v-if="warningDialog"
          :title="'¡Atención!'"
          :message="'El proceso de creación mandatos se guardará, para realizar un cambio deberá de consultar con su administrador.'"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import FileComponentVue from '../../../components/File/FileComponent.vue';
import FileDocument from '../../../components/File/FileDocumentComponent.vue';
import LoadingComponentBasic from '../../../components/Loading/LoadingBasicComponent.vue';
import DialogComponent from '../../../components/Dialog/DialogComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';
import { mandatosAuth } from 'src/composables/mandatosAuth';

export default {
  components: {
    FileComponentVue,
    LoadingComponentBasic,
    FileDocument,
    DialogComponent,
    BreadCrumb,
  },
  setup() {
    const $q = useQuasar();
    const loading = ref(false);
    const warningDialog = ref(false);
    const { saveMandatos } = mandatosAuth();
    const breadcrumbRoutes = ref([
      { label: 'Listar Mandatos', path: '/dashboard/listar-mandatos' },
      { label: 'Creación Mandatos', path: '/dashboard/validar-information' },
    ]);
    const loadingResult = () => {
      loading.value = true;
      setTimeout(async () => {
        loading.value = false;
      }, 2000);
    };
    const saveInfo = () => {
      warningDialog.value = true;
    };

    const onConfirm = async () => {
      warningDialog.value = false;
      loading.value = true;
      const data = {
        idmandato: 'ISSTEY2',
        datosmandato: [
          {
            name: 'Participantes',
            data: [
              {
                Tipo_de_Fideicomisario: 'Institución Financiera',
                Razon_Social_Fideicomisario: 'Consubanco, S.A.',
                Nombre_Usuario_Fideicomisario: 'Rolando',
                Apellido_Fideicomisario: 'Galindo',
                Puesto_Fideicomisario: '',
                Email_Fideicomisario: 'rgalindo@consubanco.com',
                Tipo_de_Fidecomitente: 'Institución Financiera',
                Razon_Social_Fidecomitente: 'Consubanco, S.A.',
                Nombre_Fidecomitente: 'Rolando',
                Apellido_Fidecomitente: 'Galindo',
                Puesto_Fidecomitente: '',
                Email_Fidecomitente: 'rgalindo@consubanco.com',
                Tipo_de_Fiduciario: 'Institución Financiera',
                Razon_Social_Fiduciario: 'CIBanco, S.A',
                Nombre_Fiduciario: 'Jerusha Ximena',
                Apellido_Fiduciario: 'Cruz_Gonzalez',
                Puesto_Fiduciario: '',
                Email_Fiduciario: 'xcruz@cibanco.com',
              },
            ],
          },
          {
            name: 'Tipo_Mandato',
            data: [
              {
                Tipo_de_Activo: 'Crédito con descuento en nómina -  gobierno',
                Tipo_de_Mandato: 'Fideicomiso de Fondeo Privado',
                Caracter_de_AF_Coma: 'Administrador Maestro',
                Status_del_Mandato: 'Operativo sin revolvencia',
                Fecha_de_Inicio_Mandato: '10/11/2023',
                Monto_del_Financiamiento: '',
              },
            ],
          },
          {
            name: 'Parametros_Mandato',
            data: [
              {
                Fecha_firma_contratos: '01/11/2023',
                Fecha_emision: '23/11/2024',
                Fecha_vencimiento: '',
                Fecha_revolvencia: '',
                Fecha_de_pago_de_intereses: '',
                Fecha_de_pago_de_principal: '',
                Fecha_notificacion_de_reservas: '',
                Fecha_de_corte_o_determinacion: '',
                Fecha_de_Distribucion: '10 DÍA DE CADA MES',
                Fecha_Reporte_Semanal: '',
                Fecha_Reporte_Mensual: '12 DÍA HABIL DE CADA MES',
                Fecha_Reporte_de_Distribuciones: '10 DÍA DE CADA MES',
                Fecha_Reporte_de_Dispersion: '',
                Fecha_Reporte_de_Vencimientos_y_Afectaciones: '',
                Fecha_gastos_de_mantenimiento: '10 DÍA DE CADA MES',
                Fecha_registro_RUG: '5 DÍAS DEL EVENTO',
                Fecha_estados_de_cuenta: '10 DÍA DE CADA MES',
                Fecha_prepago: '',
                Fecha_finaliza_operacion: '',
                Fecha_cancelacion_RUG: '5 DÍAS DEL EVENTO DE UN PREPAGO',
                Fecha_de_revision_digital: '15 DÍA DE CADA MES',
                Fecha_de_revision_física: '01/11/2024',
                Fecha_de_cancelacion_de_mandato: '',
                Aforo_Mínimo: '',
                Aforo_Requerido: '',
                Aforo_para_distribucion_de_excedentes: '',
                Plazo_días: '',
                Plazo_en_meses: '',
                Tasa_de_interés: '',
                Monto_máximo_de_gastos_de_mantenimiento: '',
                Porcentaje_excedete_en_el_fondo_general: '',
                Días_para_registro_en_el_RUG: '5 DÍAS HABILES DE CADA MES',
                Monto_contrato_de_cobertura: '',
                'Anexo_Lista_Inicial_(listas_adicionales)': true,
                Comunicado_Acceso_Cuentas_Fideicomiso: true,
                Comunicado_Alta_Personas_Autorizadas: true,
                Comunicado_Certificacion_Originador: false,
                Comunicado_de_Prepago_del_Fondeo: false,
                Comunicado_de_Reversion_de_Derechos_de_Cobro: false,
                Comunicado_de_Sustitucion_de_Cartera: false,
                'Comunicado_de_Terminacion_del_Periodo_de_Revolvencia.': false,
                Comunicado_de_Transmision_de_Derechos_de_Cobro: true,
                Comunicados_de_algún_o_de_cualquier_Evento_indicado_en_los_Documentos_Legales: false,
                'Dictamen_Cesion_Inicial_(cesiones_adicionales)': false,
                Instruccion_de_Devolucion: false,
                Instruccion_de_Dispersion: false,
                Instruccion_de_Distribucion: true,
                Instruccion_de_Gastos_de_Mantenimiento: false,
                Instruccion_de_Pago_de_Contraprestacion: true,
                'Instruccion_de_Pago_de_Deuda_(intereses_y/o_principal_del_crédito)': false,
                Instruccion_de_Reconstitucion_de_Reservas: false,
                Instruccion_de_Transferencias: false,
                Notificacion_de_Inspeccion_Física: true,
                'Reporte_Cartera_Inicial_(originador)': false,
                Reporte_de_Cartera_y_Cobranza_Mensual: true,
                Reporte_de_Cartera_y_Cobranza_Semanal: false,
                Reporte_de_Cobranza: false,
                'Reporte_de_Dispersion_(Fideicomisos_Maestros)': false,
                Reporte_de_Distribucion: true,
                Reporte_de_Gastos_de_Mantenimiento: false,
                Reporte_de_Incidencias_Documentales: true,
                Reporte_de_Incidencias_Operativas: false,
                Reporte_de_Inspeccion_Física: true,
                Reporte_de_Morosidad: false,
                Reporte_de_Requisitos_de_Elegibilidad: false,
                Reporte_de_Revision_Documental: true,
                Reporte_de_Saldos: false,
                Reporte_Mensual_de_Dispersion: false,
                Instrucciones_de_Cancelacion: 'Otra',
              },
            ],
          },
          {
            name: 'Criterios_RD',
            data: [
              {
                Periodicidad_de_la_revision_digital: ' 15 DÍAS NATURALES',
                Cantidad_de_muestra: 100,
                Porcentaje_de_la_muestra: '',
                Porcentaje_minimo_de_la_muestra: '',
                Porcentaje_maximo_de_la_muestra: '',
                Contrato_apegado_al_formato: true,
                Pagare_en_condiciones_de_cobro: true,
                Revisa_solicitud_de_credito: true,
                Revisa_identificacion_oficial: true,
                Revisa_comprobante_de_ingresos: true,
                Revisa_historial_crediticio: false,
                Revisa_estado_de_cuenta: true,
                Revisa_contrato: true,
                Revisa_pagare: true,
                Revisa_autorizacion_de_descuento: true,
                Revisa_Comprobante_de_domicilio: true,
                Revisa_domiciliacion: true,
                OTRO: 'ID DE LA ENTIDAD DE GOBIERNO',
              },
            ],
          },
          {
            name: 'Parametros_Credito',
            data: [
              {
                Monto_total_del_programa: '',
                Monto_primer_tranche: '',
                Comision_apertura: '',
                Plazo__meses_: '',
                Tasa_de_Interes: '',
                Tasa_moratoria: '',
                Comision_por_prepago: '',
                Gracia_capital__periodo_de_revolvencia_: '',
                Vigencia_del_programa__linea_de_credito_: '',
                Frecuencia_de_pago: '',
                Tipo_de_amortizacion: '',
                Garantia: '',
                Cancelacion_Anticipada: '',
                Fecha_firma_contrato: '',
                Fecha_desembolso: '',
                Fecha_inicio_pago_intereses: '',
                Fecha_inicio_pago_capital: '',
                Fecha_ultimo_pago: '',
                Fecha_vencimiento: '',
                Fecha_cancelacion: '',
                Fecha_prepago: '',
                Fecha_de_pago: '',
                Numero_de_Cupon: '',
                Pago_intereses: '',
                Pago_principal: '',
                Monto_pago_cupon: '',
                Saldo_despues_del_pago: '',
                Fecha_inicial: '',
                Fecha_fin: '',
                Dias: '',
                Tasa: '',
                'Disposicion_|_Tranche': '',
              },
            ],
          },
          {
            name: 'ApliPagos',
            data: [
              {
                Devolucion_de_recursos_que_no_corresponden_al_fideicomiso: '',
                Montos_que_corresponden_a_impuestos__pe_IVA: '',
                Pago_de_los_gastos_mensuales: 1,
                Comisiones__honorarios_y_costos_razonables_incurridos: 2,
                Intereses_moratorios_devengados_y_pagaderos: '',
                Para_reservar_los_montos_correspondientes_a_intereses_ordinarios_:
                  '',
                Reserva_de_gastos_de_mantenimiento: '',
                Para_reservar_los_montos_correspondientes_a_principal_: '',
                Para_el_monto_de_Reserva_del_Servicio_de_la_Deuda: '',
                Para_transferir_a_la_Cuenta_de_nivelacion_de_aforo: '',
                Para_transferir_a_la_Cuenta_de_cobertura__derivados_: '',
                Para_pagar_cualesquier_indemnizacion: '',
                Despues_de_cumplimiento_para_liberar_excedente_al_fideicomitente: 3,
              },
            ],
          },
          {
            name: 'Parametros_Cta_desembolso',
            data: [
              {
                Banco: 'HSBC',
                Parametro: 'Cuenta de desembolso',
                Banco_Origen_: 'CIBANCO',
                Beneficiario: 'FIDEICOMISO CIB/4219',
                Numero_de_cuenta: 3696774,
                Tipo_de_Token: 143180000036967000,
                Evento_de_Incumplimiento: '',
                Descripcion_movimientos_a_aplicar: '',
                Monto_inicial: '',
                Saldo_minimo: '',
                'Tipo de Token': '',
                'Evento de Incumplimiento': '',
                'Descripción movimientos a aplicar': '',
                'Monto inicial': '',
                'Saldo mínimo': '',
              },
            ],
          },
          {
            name: 'Parametros_Cta_Cobranza',
            data: [
              {
                Banco: 'HSBC',
                Parametro: 'Cuenta de desembolso',
                Banco_Origen_: 'CIBANCO',
                Beneficiario: 'FIDEICOMISO CIB/4219',
                Numero_de_cuenta: 3696774,
                Tipo_de_Token: 3719030,
                Evento_de_Incumplimiento: 143180000037190000,
                Descripcion_movimientos_a_aplicar: '',
                Monto_inicial: '',
                Saldo_minimo: '',
                'Tipo de Token': '',
                'Evento de Incumplimiento': '',
                'Descripción movimientos a aplicar': '',
                'Monto inicial': '',
                'Saldo mínimo': '',
              },
            ],
          },
        ],
      };
      const resolve = await saveMandatos(data);
      if (resolve.ok) {
        $q.notify({
          type: 'positive',
          message: 'El Mandato se ha creado correctamente.',
        });
      } else {
        $q.notify({
          type: 'negative',
          message: resolve.message,
        });
      }
      loading.value = false;
    };

    function onCancel() {
      warningDialog.value = false;
    }

    return {
      step: ref(1),
      loading,
      saveInfo,
      warningDialog,
      loadingResult,
      onConfirm,
      breadcrumbRoutes,
      onCancel,
    };
  },
};
</script>
