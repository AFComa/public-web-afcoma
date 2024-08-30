<template>
  <q-dialog v-model="visible" persistent>
    <q-card
      class="q-pa-md modal-general"
      style="width: 990px; max-width: 100vw"
    >
      <q-form @submit="onSubmit" dense>
        <q-card-section class="modal-tex">
          <p>{{ props.title }}</p>
          <div class="row q-pt-md justify-center">
            <div class="col-xs-12 col-sm-12 col-md-12">
              <q-card>
                <q-tabs
                  v-model="tab"
                  dense
                  no-caps
                  class="text-grey"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator
                >
                  <q-tab name="mails" label="Configuración Layout" />
                  <q-tab name="alarms" label="Operaciones Layout" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="mails">
                    <div
                      class="row q-pt-sx q-col-gutter-md q-mb-md justify-center"
                    >
                      <div class="col-xs-12 col-sm-12 col-md-5">
                        <q-select
                          placeholder="Identificador del Proyecto"
                          dense
                          rounded
                          label="Identificador del Proyecto"
                          outlined
                          v-model="FileForm.proyect"
                          :options="options"
                          no-error-icon
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div
                      v-for="(field, index) in inputFields"
                      :key="index"
                      class="q-mb-md"
                    >
                      <div class="row q-col-gutter-md">
                        <!-- Input para "Campo Proyecto" -->
                        <div class="col-xs-12 col-md-3">
                          <q-input
                            v-model="field['Campo Proyecto']"
                            label="Proyecto"
                            dense
                            outlined
                            rounded
                            no-error-icon
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Este campo es obligatorio',
                            ]"
                          />
                        </div>
                        <!-- Select para "Catálogo General" -->
                        <div class="col-xs-12 col-md-3">
                          <q-select
                            v-model="field['Catálogo General']"
                            :options="catalogOptions"
                            label="Catálogo General"
                            style="font-size: 10px"
                            dense
                            outlined
                            rounded
                          />
                        </div>
                        <!-- Switch para "¿Es tipo de dato fecha?" -->
                        <div class="col-xs-12 col-md-3">
                          <q-toggle
                            v-model="field['¿Es tipo de dato fecha?']"
                            label="¿Es tipo de dato fecha?"
                            dense
                            left-label
                          />
                        </div>
                        <!-- Select para "Comparativa" -->
                        <div class="col-xs-12 col-md-3">
                          <q-select
                            v-model="field['Comparativa']"
                            :options="comparisonOptions"
                            label="Comparativa"
                            dense
                            outlined
                            rounded
                          />
                        </div>
                      </div>
                    </div>
                    <!-- Botón para agregar más campos -->
                    <q-btn
                      label="Agregar campo"
                      icon="add"
                      color="primary"
                      no-caps
                      @click="addField"
                    />
                  </q-tab-panel>

                  <q-tab-panel name="alarms">
                    <div
                      v-for="(field, index) in inputFields2"
                      :key="index"
                      class="q-mb-md"
                    >
                      <div class="row q-col-gutter-md">
                        <!-- Input para "Nombre de Campo a Crear" -->
                        <div class="col-xs-12 col-md-3">
                          <q-input
                            v-model="field['Nombre de Campo a Crear']"
                            label="Nombre de Campo a Crear"
                            dense
                            outlined
                            rounded
                          />
                        </div>
                        <!-- Select para "Campo 1" -->
                        <div class="col-xs-12 col-md-3">
                          <q-select
                            v-model="field['Campo 1']"
                            :options="filteredData"
                            label="Campo 1"
                            dense
                            outlined
                            rounded
                          />
                        </div>
                        <!-- Select para "Campo 2" -->
                        <div class="col-xs-12 col-md-3">
                          <q-select
                            v-model="field['Campo 2']"
                            :options="filteredData"
                            label="Campo 2"
                            dense
                            outlined
                            rounded
                          />
                        </div>
                        <!-- Select para "Campo 3" -->
                        <div class="col-xs-12 col-md-3">
                          <q-select
                            v-model="field['Campo 3']"
                            :options="filteredData"
                            label="Campo 3"
                            dense
                            outlined
                            rounded
                          />
                        </div>
                        <!-- Select para "Operación" -->
                        <div class="col-xs-12 col-md-3">
                          <q-select
                            v-model="field['Operación']"
                            :options="operationsOptions"
                            label="Operación"
                            dense
                            outlined
                            rounded
                          />
                        </div>
                        <!-- Switch para "¿Es Una Operación Una Matemática?" -->
                        <div class="col-xs-12 col-md-3">
                          <q-toggle
                            v-model="field['¿Es Una Operación Una Matemática?']"
                            label="¿Es Una Operación Una Matemática?"
                            dense
                            left-label
                          />
                        </div>
                      </div>
                    </div>
                    <q-btn
                      label="Agregar campo"
                      icon="add"
                      color="primary"
                      no-caps
                      @click="addField2"
                    />
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="primary"
            no-caps
            unelevated
            rounded
            size="lg"
            label="Cancelar"
            @click="closeDialog"
          />

          <q-btn
            color="secondary"
            no-caps
            unelevated
            size="lg"
            rounded
            label="Aceptar"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineEmits, computed, onMounted } from 'vue';
import { sysadocAuth } from 'src/composables/sysadocAuth';
import { useAuth } from 'src/composables/userAuth';

const props = defineProps({
  title: {
    type: String,
    default: 'Mi Diálogo',
  },
});
const { getProyectsAll, getProyectsGeneralAll } = sysadocAuth();
const { isAcces } = useAuth();
const visible = ref(true);
const tab = ref('mails');
const options = ref([]);
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const FileForm = ref({
  proyect: '',
  created_at: today.toUTCString(),
  created_by: `${isAcces.value.username} ${isAcces.value.apellidos}`,
});

const inputFields = ref([
  {
    'Campo Proyecto': '',
    'Catálogo General': '',
    '¿Es tipo de dato fecha?': false,
    Comparativa: '',
  },
]);
const inputFields2 = ref([
  {
    'Nombre de Campo a Crear': '',
    'Campo 1': '',
    'Campo 2': '',
    'Campo 3': '',
    Operación: '',
    '¿Es Una Operación Una Matemática?': 'NO',
  },
]);
const catalogOptions = ref([]);
// const campsOptions = ref([]);

const comparisonOptions = ref([
  { label: 'Menor igual', value: '<=' },
  { label: 'Igual', value: '==' },
  { label: 'Mayor igual', value: '>=' },
]);

const operationsOptions = ref([
  { label: 'Suma', value: '+' },
  { label: 'Resta', value: '-' },
  { label: 'Multiplicación', value: 'X' },
  { label: 'División', value: '/' },
]);

const emits = defineEmits(['cancel', 'select']);

const closeDialog = () => {
  visible.value = false;
  emits('cancel');
};

const onSubmit = () => {
  const data = {
    proyect: FileForm.value.proyect.value,
    created_at: FileForm.value.created_at,
    created_by: FileForm.value.created_by,
    layout: formatInput(),
    layout_spetial: formatInput2(),
  };
  emits('select', data);
  closeDialog();
};

const addField = () => {
  inputFields.value.push({
    'Campo Proyecto': '',
    'Catálogo General': '',
    '¿Es tipo de dato fecha?': false,
    Comparativa: '',
  });
};

const addField2 = () => {
  inputFields2.value.push({
    'Nombre de Campo a Crear': '',
    'Campo 1': '',
    'Campo 2': '',
    'Campo 3': '',
    Operación: '',
    '¿Es Una Operación Una Matemática?': 'NO',
  });
};

const filteredData = computed(() => {
  return inputFields.value?.map((item) => ({
    label: item['Campo Proyecto'],
    value: item['Campo Proyecto'],
  }));
});

const formatInput = () => {
  return inputFields.value.map((item) => ({
    'Campo Proyecto': item['Campo Proyecto'],
    'Catálogo General': item['Catálogo General'].value,
    '¿Es tipo de dato fecha?': item['¿Es tipo de dato fecha?'] ? 'SI' : 'NO',
    Comparativa: item.Comparativa.value,
  }));
};

const formatInput2 = () => {
  return inputFields2.value.map((item) => ({
    'Nombre de Campo a Crear': item['Nombre de Campo a Crear'],
    'Campo 1': item['Campo 1'].value,
    'Campo 2': item['Campo 2'].value,
    'Campo 3': item['Campo 3'].value,
    Operación: item.Operación.value,
    '¿Es Una Operación Una Matemática?': item[
      '¿Es Una Operación Una Matemática?'
    ]
      ? 'SI'
      : 'NO',
  }));
};

onMounted(async () => {
  const response = await getProyectsAll();
  options.value = response.resultado?.map((item) => ({
    label: item.proyecto,
    value: item.proyecto,
  }));

  const result = await getProyectsGeneralAll();
  catalogOptions.value = result.resultado?.map((item) => ({
    label: item,
    value: item,
  }));
});
</script>

<style scoped src="./DialogComponent.scss"></style>
