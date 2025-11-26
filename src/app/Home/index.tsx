import { Alert, Image, TouchableOpacity, View, Text, FlatList} from 'react-native'
import { useEffect, useState } from "react"

import { Item } from "@/components/Item"
import { Button } from "@/components/Button"
import { Input } from '@/components/Input'
import { Filter } from "@/components/Filter"
import { FilterStatus } from '@/types/FilterStatus' 
import { itemsStorage, ItemStorage } from '@/storage/itemStorage'

import { styles } from './styles'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  
  const [ filter, setFilter ] = useState(FilterStatus.PENDING)
  const [ description, setDescription ] = useState("")
  const [ items, setItems ] = useState<ItemStorage[]>()

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descricao para adicionar.")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,

    }

    await itemsStorage.add(newItem);
    await getItemsByStatus()

    setFilter(FilterStatus.PENDING);
    
    Alert.alert("Adicionado", `Adicionado ${description} com sucesso.`);
    setDescription('');
  }

  async function getItemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItems(response);
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível filtrar os itens.");
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id)
      await getItemsByStatus()
    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não foi possivel remover.")
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onClear() }
    ]);
  }

  async function onClear() {
    try {
      await itemsStorage.clear();
      setItems([]);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível remover todos os itens.");
    }
  }

  async function handleToggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id);
      await getItemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possivel atualizar o status")
    }
  }

  useEffect(() => {
    getItemsByStatus();
  }, [filter])

  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo} 
        source={require("@/assets/logo.png")} 
      />
      <View style={styles.form}>
        <Input 
          placeholder="O que você precisa comprar"
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
      <View style={styles.content}> 
        <View style={styles.header}>
          { FILTER_STATUS.map( ( status ) => (
            <Filter 
              key={status} 
              status={status} 
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          )) }
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClear}
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item            
              data={item}
              onStatus={() => handleToggleItemStatus(item.id)}  
              onRemove={() => handleRemove(item.id)}  
            />
          )}
          showsVerticalScrollIndicator={false}
          //horizontal - Se vc quer um item do lado do outro
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item adicionado.</Text>}
        />

      </View>
    </View>
  )
}