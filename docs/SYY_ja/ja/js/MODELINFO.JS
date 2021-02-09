function CreateModelInf()
{
   var   i,j;
   i = 0;
   gModelInfo[i] = SetModelInf('DBA-GB3');
   j = 0;
   gModelInfo[i].FrameList[j++] = SetModelFrame('100');
   gModelInfo[i].FrameList[j++] = SetModelFrame('110');
   gModelInfo[i].FrameList[j++] = SetModelFrame('130');
   gModelInfo[i].FrameList[j++] = SetModelFrame('140');
   gModelInfo[i].FrameList[j++] = SetModelFrame('150');
   gModelInfo[i].FrameList[j++] = SetModelFrame('500');
   gModelInfo[i].FrameList[j++] = SetModelFrame('510');
   gModelInfo[i].FrameList[j++] = SetModelFrame('520');
   gModelInfo[i].FrameList[j++] = SetModelFrame('530');
   gModelInfo[i].FrameList[j++] = SetModelFrame('540');
   i++;
   gModelInfo[i] = SetModelInf('DBA-GB4');
   j = 0;
   gModelInfo[i].FrameList[j++] = SetModelFrame('100');
   gModelInfo[i].FrameList[j++] = SetModelFrame('110');
   gModelInfo[i].FrameList[j++] = SetModelFrame('130');
   gModelInfo[i].FrameList[j++] = SetModelFrame('140');
   gModelInfo[i].FrameList[j++] = SetModelFrame('150');
   i++;
}
function SetModelInf(strCode)
{
   var  data = new Array;
   data.Code = strCode;
   data.FrameList = new Array;
   return data;
}
function SetModelFrame(strFrm)
{
   var  data = new Array;
   data.Frame = strFrm;
   return data;
}
function SetManualType()
{
   gSmFlag = 1;
   gBrmFlag = 1;
}
