'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { PostgrestQueryBuilder } from "@supabase/supabase-js/dist/index.cjs";
import { revalidatePath } from "next/cache";

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
    .select(`* , companion:companions(id , name , subject , topic , duration)`)
    .order('created_at' , {ascending : false})
    .limit(100)

    if(error || !data) throw new Error(error?.message || 'Failed to fetch recent sessions');

    const sessionMap = new Map();
    const uniqueSessions: any[] = [];
    
    for (const row of data) {
        if (!sessionMap.has(row.session_id)) {
            sessionMap.set(row.session_id, row);
            uniqueSessions.push(row);
        } else {
            const existingRow = sessionMap.get(row.session_id);
            const existingIsSystem = existingRow.type === 'session_start' || existingRow.type === 'session_end';
            const newIsSystem = row.type === 'session_start' || row.type === 'session_end';
            
            if (existingIsSystem && !newIsSystem) {
                Object.assign(existingRow, row);
            }
        }
    }

    const finalSessions = uniqueSessions.slice(0, limit);

    return finalSessions.map((session : any) => {
      const isSystemEvent = session.type === 'session_start' || session.type === 'session_end';
      return {
          ...session,
          content: isSystemEvent ? null : session.content,
          companion : session.companion || null,
          companionId : session.companion_id || null,
          name : session.companion?.name || null,
          title : session.companion?.name || null,
          subject : session.companion?.subject || null,
          topic : session.companion?.topic || null,
          duration : session.companion?.duration || null,
      }
    })
}

export const getUserSession = async (userId: string , limit = 10) => {
  const supabase = createSupabaseClient();  
  const {data , error} = await supabase
    .from('session_history')
    .select(`* , companion:companions(id , name , subject , topic , duration)`)    
    .eq('user_id', userId)
    .order('created_at' , {ascending : false})
    .limit(100)

    if(error || !data) throw new Error(error?.message || 'Failed to fetch recent sessions');

    const sessionMap = new Map();
    const uniqueSessions: any[] = [];
    
    for (const row of data) {
        if (!sessionMap.has(row.session_id)) {
            sessionMap.set(row.session_id, row);
            uniqueSessions.push(row);
        } else {
            const existingRow = sessionMap.get(row.session_id);
            const existingIsSystem = existingRow.type === 'session_start' || existingRow.type === 'session_end';
            const newIsSystem = row.type === 'session_start' || row.type === 'session_end';
            
            if (existingIsSystem && !newIsSystem) {
                Object.assign(existingRow, row);
            }
        }
    }

    const finalSessions = uniqueSessions.slice(0, limit);

    return finalSessions.map((session : any) => {
      const isSystemEvent = session.type === 'session_start' || session.type === 'session_end';
      return {
        ...session,
        content: isSystemEvent ? null : session.content,
        companion : session.companion || null,
        companionId : session.companion_id || null,
        name : session.companion?.name || null,
        title : session.companion?.name || null,
        subject : session.companion?.subject || null,
        topic : session.companion?.topic || null,
        duration : session.companion?.duration || null,
      }
    })
}
export const getUserCompanions = async (userId: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('author', userId)

    if(error) throw new Error(error.message);

    return data;
}
export const newCompanionPermissions = async () => {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();

    let limit = 0;

    if(has({ plan: 'pro' })) {
        return true;
    } else if(has({ feature: "3_companion_limit" })) {
        limit = 3;
    } else if(has({ feature: "10_companion_limit" })) {
        limit = 10;
    }

    const { data, error } = await supabase
        .from('companions')
        .select('id', { count: 'exact' })
        .eq('author', userId)

    if(error) throw new Error(error.message);

    const companionCount = data?.length;

    if(companionCount >= limit) {
        return false
    } else {
        return true;
    }
}

// Bookmarks
export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("bookmarks").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) {
    throw new Error(error.message);
  }
  // Revalidate the path to force a re-render of the page

  revalidatePath(path);
  return data;
};

export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};

// It's almost the same as getUserCompanions, but it's for the bookmarked companions
export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`companions:companion_id (*)`) // Notice the (*) to get all the companion data
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  // We don't need the bookmarks data, so we return only the companions
  return data.map(({ companions }) => companions);
};