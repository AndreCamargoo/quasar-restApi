<template>
  <q-page padding>
    <q-table title="Artigos" :rows="posts" :columns="columns" row-key="name">
      <template v-slot:top>
        <span class="text-h5">Artigos</span>
        <q-space />
        <q-btn color="primary" label="Novo" :to="{ name: 'formPost' }" />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="edit"
            color="info"
            dense
            size="sm"
            @click="handleEditPosts(props.row.id)"
          />
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="handleDeletePosts(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import postServices from "src/services/posts";
import { useQuasar } from "quasar";

defineOptions({
  name: "IndexPage",
});

const posts = ref([]);
const { list, remove } = postServices();
const $q = useQuasar();
const router = useRouter();

const columns = [
  {
    name: "id",
    field: "id",
    label: "Id",
    align: "left",
    sortable: true,
  },
  {
    name: "title",
    field: "title",
    label: "Título",
    align: "left",
    sortable: true,
  },
  {
    name: "author",
    field: "author",
    label: "Autor",
    align: "left",
    sortable: true,
  },
  {
    name: "actions",
    field: "actions",
    label: "Ações",
    align: "right",
  },
];

onMounted(() => {
  getPosts();
});

const getPosts = async () => {
  try {
    const data = await list();
    posts.value = data;
  } catch (error) {
    console.log(error);
  }
};

const handleDeletePosts = async (id) => {
  try {
    $q.dialog({
      title: "Deletar",
      message: "Deseja deletar esse post?",
      cancel: {
        push: true,
        title: "Cancelar",
        color: "negative",
      },
      persistent: true,
    }).onOk(async () => {
      await remove(id);
      await getPosts();
      $q.notify({
        message: "Removido com sucesso!",
        icon: "check",
        color: "positive",
      });
    });
  } catch (error) {
    $q.notify({ message: "Error ao apagar", icon: "check", color: "positive" });
  }
};

const handleEditPosts = (id) => {
  router.push({ name: "formPost", params: { id } });
};
</script>
