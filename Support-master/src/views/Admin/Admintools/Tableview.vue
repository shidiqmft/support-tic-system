<template>
  <v-container>
    <v-col cols="12">
      <v-card color="#3d7ea6" dark>
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-3 basil--text">
            Deleted Ticket
          </h1>
        </v-card-title>

        <v-card-subtitle class="text-center justify-center py-6"
          >View Deleted Ticket</v-card-subtitle
        >
      </v-card>
    </v-col>
    <v-data-table
      color="#ee6f57"
      dark
      class="table"
      :headers="headers"
      :items="users"
      :rows-per-page-items="[10, 25]"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">
          <v-avatar size="42">
            <img :src="randomAvatar()" alt="avatar" />
          </v-avatar>
        </td>
        <td class="text-xs-left">{{ props.item.number }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.division }}</td>
        <td class="text-xs-left">{{ props.item.priority }}</td>
        <td class="text-xs-left">{{ props.item.date }}</td>
        <!-- <td class="text-xs-left">{{ props.item.address.city }}</td> -->
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { getTickets } from "@api/user.js";
import utils from "./../../../helpers/utils";
const avatars = [
  "https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
  "https://avataaars.io/?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
  "https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
  "https://avataaars.io/?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
  "https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly",
  "https://avataaars.io/?",
];

export default {
  name: "Tableview",
  data() {
    return {
      users: [],
      headers: [
        {
          value: "Avatar",
          align: "left",
          sortable: false,
        },
        {
          text: "Number",
          value: "number",
          align: "left",
          sortable: true,
        },
        {
          text: "Name",
          value: "name",
          align: "left",
          sortable: true,
        },
        {
          text: "Description",
          value: "description",
          align: "left",
          sortable: true,
        },
        {
          text: "Division",
          value: "division",
          align: "left",
          sortable: true,
        },
        {
          text: "Priority",
          value: "priority",
          align: "left",
          sortable: true,
        },
        {
          text: "Date",
          value: "date",
          align: "left",
          sortable: true,
        },
      ],
    };
  },

  methods: {
    randomAvatar() {
      return avatars[Math.floor(Math.random() * avatars.length)];
    },
    getData() {
      getTickets("", true).then((res) => {
        // console.log(res.data);
        const data = res.data.map((item, index) => {
          item.number = index + 1;
          item.date = utils.formatDate(item.date);
          return item;
        });
        // console.log(data);
        this.users = data;
      });
    },
  },

  created() {
    // const vm = this;
    this.getData();
    // vm.axios
    //   .get("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => {
    //     var result = response && response.data;

    //     vm.users = result;
    //   });
  },
};
</script>

<style>
.table {
  border-radius: 3px;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
  background-color: transparent;
}
</style>
