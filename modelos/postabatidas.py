import requests
from datetime import datetime, date

#montar as batidas

lista = []
hj = date.today()
for i in range(99,0,-1):
    data = date.fromordinal(hj.toordinal()-i)
    # weekday começa segunda como índice 0 e domingo como índice 6
    if(data.weekday()<5):
        data = str(data)
        lista.append({'DataHora':data+'T08:00','Tipo':'Entrada' })
        lista.append({'DataHora':data+'T12:00','Tipo':'Saida' })
        lista.append({'DataHora':data+'T13:00','Tipo':'Entrada' })
        lista.append({'DataHora':data+'T15:00','Tipo':'Saida' })
        lista.append({'DataHora':data+'T16:00','Tipo':'Entrada' })
        lista.append({'DataHora':data+'T19:00','Tipo':'Saida' })

value = {"20180501-20180505":lista}
js = str(value)
headers = {"Content-Type": "application/json","data":js}

response = requests.put('https://easycheck-b25ea.firebaseio.com/api/ponto/000001/.json',data=js,headers=headers)
print(response)


#converter a lista para json

#fazer o put no firebase

#  DataHora:String,
#  Tipo:String

# datetime.now()
# agora.strftime('%Y-%m-%d %H:%M')
# date.today() - retorna o dia de hoje
