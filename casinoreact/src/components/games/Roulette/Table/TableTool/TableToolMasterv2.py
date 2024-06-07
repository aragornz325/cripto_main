import os, json
from typing import List
from unittest import result


script_path = os.path.dirname(os.path.realpath(__file__))


table = {'disp':{},}
custom_styles = {}
mutated = {}

cells = []
ids = []

area_table = {}

rules = {}

with open(script_path+'/disposition.txt', 'r', encoding='utf-8') as disposition:

    lines = disposition.readlines()
    table['size'] = {'x':len(lines[0].strip('\n')),'y':len(lines)}

    print('Input table size is:',table['size'])

    for y,line in enumerate(lines):

        # print(line)

        for x,char in enumerate(line.strip('\n')):    
            
            table['disp'][x,y] = char
            
            pass
    
    disposition.close()

with open(script_path+'/ids.txt', 'r', encoding='utf-8') as _ids:
   
    for line in  _ids.readlines():
       
        ids.append(line.strip('\n'))
   
    print(len(ids))
    _ids.close()
    
with open(script_path+"/custom_styles.json", 'r', encoding='utf-8') as _custom_styles:
    custom_styles = json.load(_custom_styles)
    _custom_styles.close()

def findSize(posx:int, posy:int, stoph:char = None, stopv:char = None)-> List[int]:
    
    match [stoph,stopv]:
        
        case [None,None]:
            #print("Neither")
            return
        
        case [H,None]:
            #print('StopH is a char!')
            
            size_counter_x=0;
    
            for x in range(table_size_x):
    
                char_at_pos = table['disp'][posx+size_counter_x,posy]

                if char_at_pos == H:
                    return [size_counter_x+1,1]

                size_counter_x += 1

            return
        
        case [None,V]:
            #print('StopV is a char!')

            size_counter_y=0;
            
            for y in range(table_size_y):
    
                char_at_pos = table['disp'][posx,posy+size_counter_y]

                if char_at_pos == V:
                    return [1,size_counter_y+1]

                size_counter_y += 1

            return
        
        case [H,V]:
            #print('Both.')
    
            size_counter_x=0;
            size_counter_y=0;
            
            for y in range(table_size_y):
    
                char_at_pos = table['disp'][posx+size_counter_x,posy+size_counter_y]

                if char_at_pos == V:
    
                    for x in range(table_size_x):
                    
                        char_at_pos = table[posx+size_counter_x,posy+size_counter_y]

                        if char_at_pos == H:

                            return [size_counter_x+1,size_counter_y+1]

                        size_counter_x += 1

                size_counter_y += 1

            return [None,None]
        
    return [None,None]

def replaceBySize ( posx:int, posy:int, sizex:int, sizey:int, replacement:char = '■' ) -> None:
    
    for y in range(sizey):
    
    
        for x in range(sizex):

            table['disp'][posx+x,posy+y] = replacement

            pass
    
    pass

def ifInTakeVal(key,dict:dict,default = None):
    if key in dict.keys():
        return dict[key]
    return default



for cellID in custom_styles.keys():

    print(cellID)
    
    if 'rules' in custom_styles[cellID].keys():

        rules[cellID] = {}

        for rule in custom_styles[cellID]['rules']:
            
            print(cellID,rule)
            rules[cellID][rule] = custom_styles[cellID]['rules'][rule]
    
        custom_styles[cellID].pop('rules')
        
    if 'mutate' in custom_styles[cellID].keys():

        mutated[cellID] = custom_styles[cellID]['mutate']
    
        custom_styles[cellID].pop('mutate')




def checkIfValid(selfid,selfpos,anotherid,anotherpos):

    result = True

    if selfid in rules.keys():
        
        result = False

        for rule in rules[selfid].keys():

            match rule:

                case 'horizontal':

                    result = result or selfpos[1] == anotherpos[1]

                case 'vertical':

                    result = result or selfpos[0] == anotherpos[0]

                case 'up':

                    result = result or selfpos[1] > anotherpos[1]

                case 'down':

                    result = result or selfpos[1] < anotherpos[1]

                case 'diagonal':

                    result = result or anotherpos[0] - selfpos[0] != 0 and anotherpos[1] - selfpos[1] != 0

                case 'mask':

                    result = result or anotherid in rules[selfid]['mask']

                case 'exclusive-mask':

                    return anotherid in rules[selfid]['mask']

                case 'none':

                    return False

    return result



table_size_y =  table['size']['y']
table_size_x =  table['size']['x']



cell_counter = 0



for y in range(table_size_y):

    for x in range(table_size_x):

        char_at_pos = table['disp'][x,y]

        cell_style = {}
        cell_color = 4
        cell_sizes = [1,1]
        cell_positions = [[x,y]]

        match char_at_pos:

            case '╔':

                size_x, size_y = findSize(x,y,'╚','╝')

                cell_style['gridColumnStart'] = x + 1
                cell_style['gridColumnEnd'] = x + 1 + size_x

                cell_style['gridRowStart'] = y + 1
                cell_style['gridRowEnd'] = y + 1 + size_y

                cell_sizes = [size_x,size_y]

                cell_positions = [
                        [
                            [posx,posy] for posx in range(x, x + size_x)
                        ] for posy in range(y, y + size_y)
                    ]


                replaceBySize(x,y,size_x,size_y)
            
            case '╦':
                
                size_x, size_y = findSize(x,y,stopv='╩')
                
                cell_style['gridRowStart'] = y + 1
                cell_style['gridRowEnd'] = y + 1 + size_y

                cell_sizes = [size_x,size_y]
                
                cell_positions = [
                        [x,pos] for pos in range(y,y + size_y)
                    ]
                
                
                replaceBySize(x,y,size_x,size_y)

            case '╠':
                
                size_x, size_y = findSize(x,y,stoph='╣')
                
                cell_style['gridColumnStart'] = x + 1
                cell_style['gridColumnEnd'] = x + 1 + size_x

                
                cell_sizes = [size_x,size_y]
                
                cell_positions = [
                        [pos,y] for pos in range(x,x + size_x)
                    ]
                
                replaceBySize(x,y,size_x,size_y)
                
            case '░':
                cell_color = 1
            
            case '▒':
                cell_color = 2

            case '▓':
                cell_color = 4

            case '■':
                continue

            case ' ':
                area_table[(x,y)] = None
                continue
            
        # ⚠️ Override styles ⚠️
        #cell_style = ifInTakeVal(char_at_pos,custom_styles,cell_style)

        cell_id = ids[cell_counter]
        cell_label = cell_id

        identifiers = cell_id.split('@')

        if len(identifiers) > 1 :

            cell_label = identifiers[0]
            cell_id = identifiers[1]
        
        
        if cell_id in custom_styles.keys():

            #print(cell_id)

            for style in custom_styles[cell_id].keys():

                #print(style)

                if style == 'color':
                    cell_color = custom_styles[cell_id][style]
                    continue

                cell_style[style] = custom_styles[cell_id][style]
        

        cell =  {
            'id' : cell_id,
            'label' : cell_label,
            'style' : cell_style,
            'color' : cell_color,
            'size' : cell_sizes,
            'positions' : cell_positions 
        }


        cell_counter += 1

        cells.append(cell)



for cell in cells:

    cell_id = cell['id']
    cell_positions = cell['positions']

    for pos in cell_positions:

        area_table[tuple(pos)] = cell_id



for cell in cells:

    cell_id = cell['id']
    cell_positions = cell['positions']
    cell_start_position = cell_positions[0]

    neighbours = {}

    for pos in cell_positions:

        x,y = pos

        relative_x,relative_y = map(int.__sub__,pos,cell_start_position)  # Subtract two pos

        cell_id = cell['id']

        mutated_id = ifInTakeVal(cell_id,mutated,cell['id'])

        #print(cell_id,x,y,relative_x,relative_y)

        for inner_y in range(3):

            for inner_x in range(3):

                mapped_x = x + inner_x - 1
                mapped_y = y + inner_y - 1

                mapped = (mapped_x,mapped_y)

#                if mapped in area_table.keys() and area_table[mapped] != cell_id:
                if mapped in area_table.keys() and area_table[mapped] != cell_id:


                    button_size_x = 1 if inner_x != 1 else 2
                    button_size_y = 1 if inner_y != 1 else 2

                    near = []

                    another_mutated = ifInTakeVal(area_table[mapped],mutated,area_table[mapped])

                    if inner_x != 1 and inner_y != 1:

                        for y_corner in range(2):

                            for x_corner in range(2):

                                fixed_corner_x = x + x_corner * (inner_x - 1 )
                                fixed_corner_y = y + y_corner * (inner_y - 1 )
                                
                                fixed_corner = (fixed_corner_x,fixed_corner_y)

                                if fixed_corner in area_table.keys() and area_table[fixed_corner] != cell_id and area_table[fixed_corner] != None and checkIfValid(cell_id,(x,y),area_table[fixed_corner],fixed_corner) and checkIfValid(area_table[fixed_corner],fixed_corner,cell_id,(x,y)):

                                    corner_mutated = ifInTakeVal(area_table[fixed_corner],mutated,area_table[fixed_corner])

                                    near.append(corner_mutated)

                    else:
                        
                        #if area_table[mapped] != ' ':
                        if area_table[mapped] != None and checkIfValid(cell_id,(x,y),area_table[mapped],mapped) and checkIfValid(area_table[mapped],mapped,cell_id,(x,y)) :
                            near.append(another_mutated)
                                
                    near.append(mutated_id)
                    near = list(dict.fromkeys(near))
                    near.sort()

                    neighbours[
                        (
                            inner_x-1,
                            inner_y-1,
                            relative_x,
                            relative_y,
                            button_size_x,
                            button_size_y
                            )
                        ] = near



    cell['neighbours'] = neighbours
    
    

for cell in cells:
    
    inner_activators = []

    neighbours = cell['neighbours']

    for neighbour in neighbours.keys():

        activator = {
            'rear' : {
                'x' : neighbour[0],
                'y' : neighbour[1]},
            
            'fromStart' : { 
                'x' : neighbour[2],
                'y' : neighbour[3]},

            'buttonSize' : {
                'x' : neighbour[4],
                'y' : neighbour[5]},

            'ids': neighbours[neighbour]
        }

        inner_activators.append(activator)

        pass

    cell['inner_activators'] = inner_activators
    cell.pop('neighbours')



output_data = {
    'size' : table['size'],
    'cells': cells,
}



with open(script_path+'/output.json', 'w') as output:
    json.dump(output_data,output,allow_nan=True,indent='\t')








