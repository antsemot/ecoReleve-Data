


	INSERT INTO [dbo].[Station]
           ([StationDate]
           ,[Name]
           ,[LAT]
           ,[LON]
           ,[ELE]
           ,[precision]
           ,[fieldActivityId]
           ,[creator]
           ,[creationDate]
           ,[FK_StationType]
           ,[FK_Region]
           ,[FK_MonitoredSite]
           ,[Place]
		   ,Original_ID
		   ,Comments
		   )
		   select DISTINCT isnull([DATE],creation_date)
		   ,S.Name,S.LAT,S.LON,S.ELE,S.precision,FA.ID,creator,S.Creation_date,st.id,R.ID,S.TSta_FK_TGeo_ID
		   ,S.Place,'eReleve_'+CONVERT(VARCHAR,S.TSta_PK_ID),s.Comments
		   from [ECWP-eReleveData].dbo.TStations S 
		   LEFT JOIN fieldActivity FA on FA.Name = S.FieldActivity_Name 
		   JOIN StationType st ON  st.name = 'standard'
		   LEFT JOIN Region R on r.Region = S.Region
		   WHERe NOT EXISTS (select * from Station S2 where S2.LAT = S.LAT AND S2.LON = S.LON AND s2.LAT = S.LAT and S.[DATE] = S2.StationDate)
		   AND (S.FieldActivity_ID != 27 or S.FieldActivity_ID IS NULL)
		   AND NOT EXISTS (SELECT * FROM [ECWP-eReleveData].dbo.TStations S2 where S.TSta_PK_ID <> s2.TSta_PK_ID and isnull(S2.LAT,-1) =isnull(S.LAT,-1) and isnull(S2.LON,-1) =isnull(S.LON,-1) and S.[DATE] = S2.[DATE] AND S2.FieldActivity_ID != 27)


---------------------------------------DynProp Station Value -----------------------------------------------

INSERT INTO StationDynPropValue (
[StartDate]
      ,[ValueInt]
      ,[ValueString]
      ,[ValueDate]
      ,[ValueFloat]
      ,[FK_StationDynProp]
      ,[FK_Station]
	)
SELECT 
ts.Date
,NULL
,CASE WHEN th.TTOP_Fullpath is nOT null THEn th.TTOP_Fullpath ELSE NULL END
,NULL
,NULL
,(SELECT ID From StationDynProp Where Name = 'Name_DistanceFromObs')
,s.ID
  FROM Station s 
  JOIN [ECWP-eReleveData_old].[dbo].[TStations] ts 
		on s.Original_ID = 'eReleve_'+CONVERT(varchar,ts.TSta_PK_ID)
LEFT JOIN THESAURUS.DBO.TTopic th on 
	ttop_parentID = 1204084 and 204081+ts.Id_DistanceFromObs = ttop_PK_id
where ts.Id_DistanceFromObs is not null 



INSERT INTO StationDynPropValue (
[StartDate]
      ,[ValueInt]
      ,[ValueString]
      ,[ValueDate]
      ,[ValueFloat]
      ,[FK_StationDynProp]
      ,[FK_Station]
	)
SELECT 
Case WHEN ts.Date is null THen ts.creation_date ELSE ts.Date END
,ts.NbFieldWorker
,null
,NULL
,NULL
,(SELECT ID From StationDynProp Where Name = 'NbFieldWorker')
,s.ID
 FROM Station s 
 JOIN [ECWP-eReleveData_old].[dbo].[TStations] ts 
		on s.Original_ID = 'eReleve_'+CONVERT(varchar,ts.TSta_PK_ID)
where ts.NbFieldWorker is not null




---------------------------------------INSERT FieldWorker -----------------------------------------------

INSERT INTO Station_FieldWorker (FK_Station,FK_FieldWorker)
SELECT s2.ID,FieldWorker1
FROM [ECWP-eReleveData].dbo.TStations S 
JOIN Station s2 ON 'eReleve_'+CONVERT(VARCHAR,S.TSta_PK_ID) = s2.Original_ID
where s.FieldWorker1 is not null
union all
SELECT  s2.ID,FieldWorker2
FROM [ECWP-eReleveData].dbo.TStations S 
JOIN Station s2 ON 'eReleve_'+CONVERT(VARCHAR,S.TSta_PK_ID) = s2.Original_ID
where s.FieldWorker2 is not null
union all
SELECT  s2.ID,FieldWorker3
FROM [ECWP-eReleveData].dbo.TStations S 
JOIN Station s2 ON 'eReleve_'+CONVERT(VARCHAR,S.TSta_PK_ID) = s2.Original_ID
where s.FieldWorker3 is not null

IF object_id('tempdb..#ProtToMigration') IS NOT NULL
	DROP TABLE #ProtToMigration
SELECT ProtocoleName into #ProtToMigration  from [MigrationConfigurationProtocoleList] L
DECLARE @ProtocoleName VARCHAR(100)

WHILE EXISTS (SELECT * FROM #ProtToMigration)
BEGIN
		
		SELECT TOP 1 @ProtocoleName=ProtocoleName from #ProtToMigration
	
		exec pr_MigrationProtocole @ProtocoleName
		DELETE FROM #ProtToMigration WHERE ProtocoleName=@ProtocoleName
END

