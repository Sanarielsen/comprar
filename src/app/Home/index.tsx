import { Image, TouchableOpacity, View, Text, ScrollView, FlatList} from 'react-native'

import { Item } from "@/components/Item"
import { Button } from "@/components/Button"
import { Input } from '@/components/Input'
import { Filter } from "@/components/Filter"
import { FilterStatus } from '@/types/FilterStatus' 

import { styles } from './styles'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

//const ITEMS = Array.from( {length: 100} ).map((_, index) => String(index))
const ITEMS = [
  { id: "1",  status: FilterStatus.DONE,    description: "1 pacote de café" },
  { id: "2",  status: FilterStatus.PENDING, description: "3 pacotes de macarrão" },
  { id: "3",  status: FilterStatus.DONE,    description: "3 cebolas" },
  { id: "4",  status: FilterStatus.PENDING, description: "5 kg de arroz" },
  { id: "5",  status: FilterStatus.DONE,    description: "2 litros de leite" },
  { id: "6",  status: FilterStatus.PENDING, description: "12 ovos" },
  { id: "7",  status: FilterStatus.DONE,    description: "2 pães grandes" },
  { id: "8",  status: FilterStatus.PENDING, description: "1 kg de açúcar" },
  { id: "9",  status: FilterStatus.DONE,    description: "1 kg de sal" },
  { id: "10", status: FilterStatus.PENDING, description: "900 ml de óleo" },
  { id: "11", status: FilterStatus.DONE,    description: "200 g de manteiga" },
  { id: "12", status: FilterStatus.PENDING, description: "300 g de queijo" },
  { id: "13", status: FilterStatus.DONE,    description: "200 g de presunto" },
  { id: "14", status: FilterStatus.PENDING, description: "6 tomates" },
  { id: "15", status: FilterStatus.DONE,    description: "2 kg de batata" },
  { id: "16", status: FilterStatus.PENDING, description: "1 kg de cenoura" },
  { id: "17", status: FilterStatus.DONE,    description: "1 kg de maçã" },
  { id: "18", status: FilterStatus.PENDING, description: "1 dúzia de bananas" },
  { id: "19", status: FilterStatus.DONE,    description: "1 kg de laranja" },
  { id: "20", status: FilterStatus.PENDING, description: "6 limões" },
  { id: "21", status: FilterStatus.DONE,    description: "1 maço de alface" },
  { id: "22", status: FilterStatus.PENDING, description: "2 pepinos" },
  { id: "23", status: FilterStatus.DONE,    description: "1 kg de feijão" },
  { id: "24", status: FilterStatus.PENDING, description: "1 kg de carne moída" },
  { id: "25", status: FilterStatus.DONE,    description: "1 kg de frango" },
  { id: "26", status: FilterStatus.PENDING, description: "500 g de peixe" },
  { id: "27", status: FilterStatus.DONE,    description: "4 potes de iogurte" },
  { id: "28", status: FilterStatus.PENDING, description: "1 caixa de cereal" },
  { id: "29", status: FilterStatus.DONE,    description: "2 pacotes de biscoitos" },
  { id: "30", status: FilterStatus.PENDING, description: "1 barra de chocolate" },
  { id: "31", status: FilterStatus.DONE,    description: "2 litros de suco" },
  { id: "32", status: FilterStatus.PENDING, description: "6 garrafas de água" },
  { id: "33", status: FilterStatus.DONE,    description: "4 rolos papel higiênico" },
  { id: "34", status: FilterStatus.PENDING, description: "1 kg de sabão em pó" },
  { id: "35", status: FilterStatus.DONE,    description: "500 ml detergente" },
  { id: "36", status: FilterStatus.PENDING, description: "2 esponjas" },
  { id: "37", status: FilterStatus.DONE,    description: "1 pote de café solúvel" },
  { id: "38", status: FilterStatus.PENDING, description: "1 caixa de chá" },
  { id: "39", status: FilterStatus.DONE,    description: "1 lata de milho" },
  { id: "40", status: FilterStatus.PENDING, description: "1 lata de ervilha" },
  { id: "41", status: FilterStatus.DONE,    description: "2 sachês de molho de tomate" },
  { id: "42", status: FilterStatus.PENDING, description: "1 ketchup" },
  { id: "43", status: FilterStatus.DONE,    description: "1 mostarda" },
  { id: "44", status: FilterStatus.PENDING, description: "200 g cream cheese" },
  { id: "45", status: FilterStatus.DONE,    description: "1 molho de pimenta" },
  { id: "46", status: FilterStatus.PENDING, description: "10 g fermento biológico" },
  { id: "47", status: FilterStatus.DONE,    description: "2 kg de farinha de trigo" },
  { id: "48", status: FilterStatus.PENDING, description: "500 g de aveia" },
  { id: "49", status: FilterStatus.DONE,    description: "1 pacote de granola" },
  { id: "50", status: FilterStatus.PENDING, description: "1 pote de geleia" },
]
export function Home() {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo} 
        source={require("@/assets/logo.png")} 
      />
      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar" />
        <Button title="Entrar" />
      </View>
      <View style={styles.content}> 
        <View style={styles.header}>
          { FILTER_STATUS.map( ( status ) => (
            <Filter key={status} status={status} isActive />
          )) }
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={ITEMS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item            
              data={item}
              onStatus={() => console.log("Mudar o status")}  
              onRemove={() => console.log("Remover o item")}  
            />
          )}
          showsVerticalScrollIndicator={false}
          //horizontal - Se vc quer um item do lado do outro
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />

      </View>
    </View>
  )
}