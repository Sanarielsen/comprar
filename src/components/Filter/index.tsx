import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { CircleCheck, CircleDashed } from "lucide-react-native"

import { StatusIcon } from "@/components/StatusIcon"
import { FilterStatus } from "@/types/FilterStatus"

import { styles } from "./styles"

type Props = TouchableOpacityProps & {
  isActive: boolean;
  status: FilterStatus;
}

export function Filter( { isActive, status, ...rest }: Props ) {
  return (
    <TouchableOpacity 
      style={[styles.container, {opacity: isActive ? 1 : 0.5}]} 
      activeOpacity={0.8}
      {...rest}
    >
      <StatusIcon status={status} />
      <Text style={styles.title}> 
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  )
}