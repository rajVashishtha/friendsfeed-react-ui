import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';

import './ConversationList.css';
import { AddCircleOutline } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  const [skeleton, setSkeleton] = useState(true)
  useEffect(() => {
    getConversations();
  },[])

 const getConversations = () => {
    axios.get('https://randomuser.me/api/?results=30').then(response => {
        let newConversations = response.data.results.map(result => {
          return {
            photo: result.picture.large,
            name: `${result.name.first} ${result.name.last}`,
            text: 'Hello world! This is a long message that needs to be truncated.'
          };
        });
        setConversations([...conversations, ...newConversations])
        setSkeleton(false)
    });
  }

    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          rightItems={[
            <ToolbarButton key="add" icon={<AddCircleOutline />} />
          ]}
        />
        <ConversationSearch />
          {
            skeleton?(
              <div>
                <div style={{display:"flex",flexDirection:"row", alignItems:"center"}}>
                  <div>
                  <Skeleton animation="wave" variant="circle" height={50} width={50} />
                  </div>
                  <div style={{paddingLeft:10}}>
                    <Skeleton animation="wave" variant="rect" height={10} width={300} />
                    <Skeleton animation="wave" variant="rect" height={20} style={{marginTop:"10px"}} />
                  </div>
              </div>
              <div style={{display:"flex",flexDirection:"row", alignItems:"center", marginTop:50}}>
                <div>
                <Skeleton animation="wave" variant="circle" height={50} width={50} />
                </div>
                <div style={{paddingLeft:10}}>
                  <Skeleton animation="wave" variant="rect" height={10} width={300} />
                  <Skeleton animation="wave" variant="rect" height={20} style={{marginTop:"10px"}} />
                </div>
            </div>
              </div>
            ):(null)
          }
        
        {
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
}