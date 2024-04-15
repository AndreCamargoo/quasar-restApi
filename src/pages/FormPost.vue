<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">
      <q-input
        outlined
        label="Titulo"
        hint="Digite seu titulo"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[(val) => (val && val.length > 0) || 'Campo é obrigatório']"
        v-model="form.title"
      />

      <q-input
        outlined
        label="Autor"
        hint="Digite o autor"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[(val) => (val && val.length > 0) || 'Campo é obrigatório']"
        v-model="form.author"
      />

      <div class="col-lg-6 col-xs-12 col-xl-12">
        <q-editor
          label="Conteudo"
          hint="Digite seu conteudo"
          :definitions="{
            bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
          }"
          min-height="5rem"
          v-model="form.content"
        />
      </div>

      <div class="col-12 q-gutter-sm">
        <q-btn
          color="primary"
          text-color="white"
          label="Salvar"
          icon="save"
          class="float-right text-right"
          type="submit"
        />
        <q-btn
          color="black"
          text-color="white"
          label="Cancelar"
          icon="close"
          class="float-right"
          :to="{ name: 'home' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import postServices from "src/services/posts";
import { useQuasar } from "quasar";

defineOptions({
  name: "formPost",
});

const { post, getById, update } = postServices();
const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const form = ref({
  title: "",
  author: "",
  content: "",
});

onMounted(async () => {
  if (route.params.id) {
    getPost(route.params.id);
  }
});

const getPost = async (id) => {
  try {
    const response = await getById(id);
    console.log(response);
    form.value = response;
  } catch (error) {
    console.log(error);
  }
};

const onSubmit = async () => {
  try {
    if (form.value.id) {
      await update(form.value);
    } else {
      await post(form.value);
    }

    $q.notify({
      message: "Artigo salvo com sucesso",
      icon: "check",
      color: "positive",
    });
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
</script>
