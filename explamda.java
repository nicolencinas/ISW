public static List<Integer> mapear (Function<Integer, Integer> operacion, <Integer> lista)){


List <Integer> resultado =new ArrayList<>();

for (integer elem: lista){

resultado.add(operacion.apply(elem);
))
}
}