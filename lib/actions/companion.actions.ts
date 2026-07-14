'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { PostgrestQueryBuilder } from "@supabase/supabase-js/dist/index.cjs";

export const createCompanion = async (formData: CreateCompanion): Promise<any> => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .insert({ ...formData, author })
    .select();

  if (error || !data) throw new Error(error?.message || 'Failed to create a companion');

  return data[0];
}

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase.from('companions').select();

  if (subject && topic) {
    query = query.ilike('subject', `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
  } else if (subject) {
    query = query.ilike('subject', `%${subject}%`)
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error || !companions) throw new Error(error?.message || 'Failed to fetch companions');

  return companions;

}

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
}


export const addToSessionHistory = async ({companionId , sessionId , type , content , status} : {companionId:string , sessionId:string , type:string , content:string , status:string} ) => {
  const {userId} = await auth();
  const supabase = createSupabaseClient();

  const {data , error} = await supabase
    .from('session_history').insert({
      user_id: userId,
      companion_id : companionId,
      session_id: sessionId,
      type: type,
      content: content,
      status: status
    }).select()
    

    if(error || !data) throw new Error(error?.message || 'Failed to add to session history');

    return data[0];
}
export const getRecentSessions = async (limit = 10) => {
  
  const supabase = createSupabaseClient();  
  const {data , error} = await supabase
    .from('session_history')
    .select(`* , companion(id , name , subject , topic , title)`)    
    .order('created_at' , {ascending : false})
    .limit(limit)
    if(error || !data) throw new Error(error?.message || 'Failed to fetch recent sessions');
    return data.map((session : any) => ({
      ...session,
      companion : session.companion || null,
      companionId : session.companionId || null,
      title : session.companion.title || null,
      subject : session.companion.subject || null,
      topic : session.companion.topic || null,
    }))
}

export const getUserSession = async (userId: string , limit = 10) => {
  
  const supabase = createSupabaseClient();  
  const {data , error} = await supabase
    .from('session_history')
    .select(`* , companion(id , name , subject , topic , title)`)    
    .eq('user_id', userId)
    .order('created_at' , {ascending : false})
    .limit(limit)
    if(error || !data) throw new Error(error?.message || 'Failed to fetch recent sessions');
    return data.map((session : any) => ({
      ...session,
      companion : session.companion || null,
      companionId : session.companionId || null,
      title : session.companion.title || null,
      subject : session.companion.subject || null,
      topic : session.companion.topic || null,
    }))
}